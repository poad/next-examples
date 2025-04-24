import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { GraphQLError } from 'graphql';
import { Pokemon, Resolvers } from './generated/graphql';

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;
const S3_OBJECT_KEY = process.env.S3_OBJECT_KEY as string;

const s3 = new S3Client({});

const getPokemons = async () => {
  const s3object = await s3.send(
    new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: S3_OBJECT_KEY,
    }),
  );

  const s3objectBody = await s3object.Body?.transformToString();
  if (!s3objectBody) {
    return undefined;
  }
  return JSON.parse(s3objectBody) as Pokemon[];
};

export const resolvers: Resolvers = {
  Query: {
    list: async () => {
      const pokemons = await getPokemons();
      if (!pokemons) {
        throw new GraphQLError('Cannot get data');
      }
      return pokemons;
    },
  },
};

export default resolvers;
