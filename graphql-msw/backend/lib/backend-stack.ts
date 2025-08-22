import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as awslogs from 'aws-cdk-lib/aws-logs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface BackendStackProps extends cdk.StackProps {
  appName: string;
  parameterName: string;
  bucketName: string;
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const { appName, parameterName, bucketName } = props;

    const bucket = s3.Bucket.fromBucketName(this, 'StoreBucket', bucketName);

    const functionName = `${appName}-api`;
    const logs = new awslogs.LogGroup(this, 'LogGroup', {
      logGroupName: `/aws/lambda/${functionName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: awslogs.RetentionDays.THREE_DAYS,
    });

    const fn = new nodejs.NodejsFunction(this, 'LambdaFunction', {
      functionName,
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.ARM_64,
      entry: './lambda/index.ts',
      retryAttempts: 0,
      timeout: cdk.Duration.seconds(29),
      environment: {
        LOG_LEVEL: 'INFO',
        NODE_OPTIONS: '--enable-source-maps',
        NODE_ENV: 'production',
        S3_BUCKET_NAME: bucketName,
        S3_OBJECT_KEY: 'pokemon.json',
        // AWS Lambda Powertools設定
        POWERTOOLS_SERVICE_NAME: 'graphql-api',
        POWERTOOLS_LOG_LEVEL: 'INFO',
        POWERTOOLS_LOGGER_LOG_EVENT: 'true',
        POWERTOOLS_LOGGER_SAMPLE_RATE: '0.1',
      },
      bundling: {
        minify: true,
        sourceMap: true,
        sourceMapMode: nodejs.SourceMapMode.BOTH,
        sourcesContent: true,
        keepNames: true,
        target: 'node22',
        format: nodejs.OutputFormat.ESM,
        mainFields: ['module', 'main'],
        commandHooks: {
          beforeInstall(): string[] {
            return [''];
          },
          beforeBundling(): string[] {
            return [''];
          },
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [
              // スキーマ定義を追加
              `cp ${inputDir}/schema.graphqls ${outputDir}`,
            ];
          },
        },
      },
      role: new iam.Role(this, 'LambdaFunctionRole', {
        roleName: `${functionName}-role`,
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        inlinePolicies: {
          'logs-policy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
                resources: [`${logs.logGroupArn}:*`],
              }),
            ],
          }),
          's3-access-policy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['s3:GetObject'],
                resources: [`${bucket.bucketArn}/*`],
              }),
            ],
          }),
        },
      }),
    });

    const api = new apigateway.RestApi(this, 'APIGateway', {
      restApiName: 'GraphQL API',
      description: 'GraphQL API for msw example with Apollo Server v5',
      deployOptions: {
        stageName: 'default',
      },
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL],
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
          'Apollo-Require-Preflight',
        ],
        allowCredentials: true,
        disableCache: true,
        statusCode: 200,
      },
      cloudWatchRole: true,
      endpointExportName: 'graphql',
    });

    // GraphQL endpoint
    api.root.addMethod('POST', new apigateway.LambdaIntegration(fn, {
      proxy: true,
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': '\'*\'',
            'method.response.header.Access-Control-Allow-Headers': '\'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Apollo-Require-Preflight\'',
            'method.response.header.Access-Control-Allow-Methods': '\'GET,POST,OPTIONS\'',
          },
        },
      ],
    }), {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
          },
        },
      ],
    });

    // Apollo Server v5 supports GET requests for queries
    api.root.addMethod('GET', new apigateway.LambdaIntegration(fn, {
      proxy: true,
    }));

    new apigateway.GatewayResponse(this, 'UnauthorizedGatewayResponse', {
      restApi: api,
      type: apigateway.ResponseType.UNAUTHORIZED,
      statusCode: '401',
      responseHeaders: {
        'Access-Control-Allow-Origin': '\'*\'',
      },
    });

    new apigateway.GatewayResponse(this, 'ClientErrorGatewayResponse', {
      restApi: api,
      type: apigateway.ResponseType.DEFAULT_4XX,
      responseHeaders: {
        'Access-Control-Allow-Origin': '\'*\'',
      },
    });

    new apigateway.GatewayResponse(this, 'ServerErrorGatewayResponse', {
      restApi: api,
      type: apigateway.ResponseType.DEFAULT_5XX,
      responseHeaders: {
        'Access-Control-Allow-Origin': '\'*\'',
      },
    });

    new ssm.StringParameter(this, 'ApiEndpointParameter', {
      parameterName,
      stringValue: api.url,
    });
  }
}
