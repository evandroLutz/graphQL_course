const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    actualTime: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    actualTime: () => new Date().toString(),
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});