import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import  resolvers from './resolvers/index.js';

const server = new ApolloServer({ typeDefs: importSchema('./schema/index.graphql'), resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});