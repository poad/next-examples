import * as fs from 'fs';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { resolvers } from './resolvers.js';

const schemaFilePath = fs.existsSync('/var/task/schema.graphqls')
  ? '/var/task/schema.graphqls'
  : '../schema.graphqls';
const schema = loadSchemaSync(schemaFilePath, {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
  schema,
  resolvers,
});

export default schemaWithResolvers;
