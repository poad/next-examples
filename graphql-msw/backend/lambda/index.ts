import { ApolloServer } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';
import {
  APIGatewayProxyEvent,
  Context,
} from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import schemaWithResolvers from './schema';

// AWS Lambda Powertools Logger設定
const logger = new Logger({
  serviceName: 'graphql-api',
  logLevel: (process.env.LOG_LEVEL as 'DEBUG' | 'INFO' | 'WARN' | 'ERROR') || 'INFO',
  environment: process.env.NODE_ENV || 'development',
});

// Context型定義
interface MyContext {
  lambdaEvent: APIGatewayProxyEvent;
  lambdaContext: Context;
  logger: Logger;
}

// Apollo Server v5の設定
const server = new ApolloServer<MyContext>({
  schema: schemaWithResolvers,
  introspection: true,
  logger: {
    debug: (message) => logger.debug(message),
    info: (message) => logger.info(message),
    warn: (message) => logger.warn(message),
    error: (message) => logger.error(message),
  },
  // Apollo Server v5の新機能：400エラーの適切な処理
  status400ForVariableCoercionErrors: true,
  // フォーマットエラーの改善
  formatError: (formattedError) => {
    // 本番環境では詳細なエラー情報を隠す
    if (process.env.NODE_ENV === 'production') {
      // 内部エラーの詳細を隠す
      if (formattedError.message.startsWith('Internal server error')) {
        return {
          message: 'Internal server error',
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        };
      }
    }
    
    // 開発環境では詳細なエラー情報を表示
    logger.error('GraphQL Error', { error: formattedError });
    return formattedError;
  },
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ 
          embed: false,
          footer: false,
        }),
  ],
});

// Lambda handler - Apollo Server v5対応
export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    context: async ({ event, context }): Promise<MyContext> => {
      // 追加のメタデータ
      const requestMetadata = {
        awsRequestId: context.awsRequestId,
        functionName: context.functionName,
        functionVersion: context.functionVersion,
        userAgent: event.headers['User-Agent'],
        sourceIp: event.requestContext.identity?.sourceIp,
        httpMethod: event.httpMethod,
        path: event.path,
        queryStringParameters: event.queryStringParameters,
      };

      logger.info('GraphQL request received', requestMetadata);

      // Lambda event と context を GraphQL context に追加
      return {
        lambdaEvent: event,
        lambdaContext: context,
        logger,
      };
    },
  },
);

export default handler;
