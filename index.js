const { ApolloServer, gql } = require('apollo-server');

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com', profile: { id: '1' }},
  { id: '2', name: 'Bob', email: 'bob@example.com', profile: { id: '2'}},
  { id: '3', name: 'Charlie', email: 'charlie@example.com', profile: { id: '2'} },
];

const profiles = [{ id: '1', name: 'Administrator' }, { id: '2', name: 'Regular User' }];

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
    profile: Profile!
  }

  type Profile {
    id: ID
    name: String
  }

  type Query {
    hello: String!
    actualTime: Date!
    loggedUser: User
    spotProduct: Product!
    loteryNumbers: [Int!]!
    users: [User]
    user(id: ID): User
    profiles: [Profile]
    profile(id: ID): Profile
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
    profile: (user) => {
      return profiles.find((profile) => profile.id === user.profile.id);
    }
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
    user(_, { id }) {
      return users.find(user => user.id === id) || null;
    },
    profiles: () => profiles,
    profile(_, { id }) {
      return profiles.find(profile => profile.id === id) || null;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});