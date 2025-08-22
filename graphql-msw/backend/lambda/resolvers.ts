import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { GraphQLError } from 'graphql';
import { Pokemon, Resolvers } from './generated/graphql';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';

// Context型定義（index.tsと同じ）
interface MyContext {
  lambdaEvent: APIGatewayProxyEvent;
  lambdaContext: Context;
  logger: Logger;
}

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;
const S3_OBJECT_KEY = process.env.S3_OBJECT_KEY as string;

const s3 = new S3Client({});

const getPokemons = async (logger?: Logger): Promise<Pokemon[] | undefined> => {
  try {
    logger?.info('Fetching data from S3', {
      bucket: S3_BUCKET_NAME,
      key: S3_OBJECT_KEY,
    });

    const s3object = await s3.send(
      new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: S3_OBJECT_KEY,
      }),
    );

    const s3objectBody = await s3object.Body?.transformToString();
    if (!s3objectBody) {
      logger?.warn('S3 object body is empty');
      return undefined;
    }

    const data = JSON.parse(s3objectBody) as Pokemon[];
    logger?.info('Successfully fetched Pokemon data', {
      count: data.length,
    });
    return data;
  } catch (error) {
    logger?.error('Error fetching data from S3', {
      error: error instanceof Error ? error.message : String(error),
      bucket: S3_BUCKET_NAME,
      key: S3_OBJECT_KEY,
    });
    throw new GraphQLError('Failed to fetch data from storage', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        originalError: error instanceof Error ? error.message : String(error),
      },
    });
  }
};

export const resolvers: Resolvers<MyContext> = {
  Query: {
    list: async (_parent, _args, context) => {
      // Apollo Server v5では context にアクセスできます
      const { logger, lambdaEvent, lambdaContext } = context;

      logger.info('Fetching Pokemon list', {
        requestId: lambdaContext.awsRequestId,
        userAgent: lambdaEvent.headers['User-Agent'],
        httpMethod: lambdaEvent.httpMethod,
      });

      const pokemons = await getPokemons(logger);
      if (!pokemons) {
        logger.error('No Pokemon data found', {
          requestId: lambdaContext.awsRequestId,
        });
        throw new GraphQLError('Cannot get data', {
          extensions: {
            code: 'DATA_NOT_FOUND',
            requestId: lambdaContext.awsRequestId,
          },
        });
      }

      logger.info('Returning Pokemon records', {
        count: pokemons.length,
        requestId: lambdaContext.awsRequestId,
      });
      return pokemons;
    },
  },
};
