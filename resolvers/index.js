import query from "./Query.js";
import product from "./Product.js";
import user from "./User.js";

const resolvers = {
    Query: query,
    Product: product,
    User: user,
}

export default resolvers;