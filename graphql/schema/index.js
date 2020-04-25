const {ApolloServer, gql} = require('apollo-server-express');
const pgPool = require("../../data/db/postegresql/pool");

const rootTypeDefs = gql`    
    type Query {
        
    }
    
    type Mutation {
        
    }
`;

const rootResolvers = {
    Query: {

    },
    Mutation: {

    }
};

module.exports = {
    schema: new ApolloServer({
        typeDefs: [rootTypeDefs],
        resolvers: [rootResolvers],
        context: {
            pgPool
        },
        introspection: true,
        playground: true
    })
}