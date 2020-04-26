const {gql} = require('apollo-server-express');
const {getImageUrl} = require('../../util/image')

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
            riskScore: String
            imageUrl: String!
        }
    `,
    resolvers: {
        Patient: {
            imageUrl: () => getImageUrl()
        }

    }
}