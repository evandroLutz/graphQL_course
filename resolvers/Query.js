import { users, profiles } from '../data/db.js';

const query = {
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
};

export default query;