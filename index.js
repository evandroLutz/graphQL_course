const { ApolloServer, gql } = require('apollo-server');

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' },
];

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Query {
    hello: String!
    actualTime: Date!
    loggedUser: User
    spotProduct: Product!
    loteryNumbers: [Int!]!
    users: [User]
  }

  type Product {
    name: String!
    price: Float!
    discount: Float
    priceWithDiscount: Float
  }
`;

const resolvers = {

  Product: {
    priceWithDiscount: (parent) => {
      if (parent.discount) {
        return parent.price * (1 - parent.discount);
      }
    },
  },

  User: {
    salary: (parent) => parent.salary_real,
  },

  Query: {
    hello: () => 'Hello world!',
    actualTime: () => new Date(),
    loggedUser: () => ({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      salary_real: 50000.0,
      vip: true,
    }),
    spotProduct: () => ({
      name: 'Sample Product',
      price: 100.0,
      discount: 0.15,
    }),
    loteryNumbers: () => {
      const increasing = (a,b) => a -b;
      const numbersArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 1);
      return numbersArr.sort(increasing);
    },
    users: () => users,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});