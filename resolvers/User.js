import { profiles } from '../data/db.js';

const user = {
    salary: (parent) => parent.salary_real,
    profile: (user) => {
      return profiles.find((profile) => profile.id === user.profile.id);
    }
}

export default user;