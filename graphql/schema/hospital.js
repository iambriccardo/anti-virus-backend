const {gql} = require('apollo-server-express');

module.exports = {
    typeDefs: gql`
        type Hospital {
            id: Int!
            codStructureOd: String!
            codStructure: Int!
            name: String!
            webSite: String!
            email: String!
            municipality: String!
            address: String!
            cap: Int!
            phone: String!
            assistance: String!
            type: String!
            structureType: String!
            latP: Float!
            lonP: Float!
        }
    `,
    resolvers: {

    }
}