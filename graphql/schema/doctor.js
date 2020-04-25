const {gql} = require('apollo-server-express');

module.exports = {
    typeDefs: gql`
        type Doctor {
            id: Int!
            name: String!
            surname: String!
            officeLat: Float!
            officeLon: Float!
        }

        input FilterDoctorsInput {
            name: String
            surname: String
        }
    `,
    resolvers: {

    }
}