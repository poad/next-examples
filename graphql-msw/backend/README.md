# Welcome to your CDK TypeScript project

This is a GraphQL API backend project using Apollo Server v5 with AWS CDK deployment.

## Apollo Server v5 Features

This project has been migrated to Apollo Server v5 with the following improvements:

- **Enhanced Error Handling**: Better 400 status code handling with `status400ForVariableCoercionErrors: true`
- **Improved Type Safety**: Strongly typed GraphQL context with TypeScript
- **AWS Lambda Powertools Logging**: Structured logging with AWS Lambda Powertools Logger
- **Production-Ready**: Optimized for AWS Lambda deployment

## Architecture

- **Apollo Server v5**: Latest GraphQL server implementation
- **AWS Lambda**: Serverless compute platform
- **API Gateway**: HTTP API endpoint
- **S3**: Data storage for Pokemon data
- **CDK**: Infrastructure as Code
- **AWS Lambda Powertools**: Enhanced observability and logging

## Useful commands

* `pnpm generate`   generate GraphQL types from schema
* `pnpm build`      compile typescript to js
* `pnpm watch`      watch for changes and compile
* `pnpm test`       perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Apollo Server v5 Migration Notes

### Key Changes Made:

1. **Context Type Safety**: Added strongly typed `MyContext` interface
2. **Error Formatting**: Improved error handling with production/development modes
3. **Landing Page**: Updated to use latest landing page plugins
4. **Request Handling**: Enhanced Lambda integration with proper context passing
5. **AWS Lambda Powertools Logging**: Replaced log4js with AWS Lambda Powertools Logger

### AWS Lambda Powertools Features:

- **Structured Logging**: JSON formatted logs with correlation IDs
- **Request Tracking**: Automatic request ID and Lambda context logging
- **Environment-based Configuration**: Configurable log levels and sampling
- **AWS Integration**: Native CloudWatch and X-Ray integration

### Compatibility:

- Uses `@as-integrations/aws-lambda` v3.1.0 (compatible with Apollo Server v5)
- AWS Lambda Powertools Logger v2.25.1
- Node.js 22.x runtime
- TypeScript with ES2022 target
- ESM module format for optimal performance

### Environment Variables:

- `NODE_ENV`: Set to 'production' for production deployments
- `S3_BUCKET_NAME`: S3 bucket containing Pokemon data
- `S3_OBJECT_KEY`: S3 object key for Pokemon JSON data
- `LOG_LEVEL`: Logging level (default: 'INFO')
- `POWERTOOLS_SERVICE_NAME`: Service name for logging (default: 'graphql-api')
- `POWERTOOLS_LOG_LEVEL`: AWS Lambda Powertools log level
- `POWERTOOLS_LOGGER_LOG_EVENT`: Enable/disable event logging
- `POWERTOOLS_LOGGER_SAMPLE_RATE`: Log sampling rate for performance

## Deployment

The project is configured for AWS CDK deployment with:

- ARM64 Lambda architecture for better performance
- Optimized bundling with esbuild
- Source maps for debugging
- Proper CORS configuration
- AWS Lambda Powertools integration
- Structured logging with CloudWatch integration
