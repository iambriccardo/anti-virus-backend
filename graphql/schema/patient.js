const {gql} = require('apollo-server-express');

module.exports = {
    typeDefs: gql`
        type Patient {
            id: Int!
            fiscalCode: String!
            name: String!
            surname: String!
            dateOfBirth: String!
            familyMembers: Int!
            homeLat: Float!
            homeLon: Float!
        }
    `,
    resolvers: {

    }
}