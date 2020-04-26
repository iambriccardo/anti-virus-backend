const {gql} = require('apollo-server-express');

module.exports = {
    typeDefs: gql`
        type Symptom {
            id: Int!
            registrationDate: String!
            bodyTemperature: Float!
            tiredness: Int!
            cough: Int!
            pain: Int!
            nasalCongestion: Boolean!
            soarThroat: Boolean!
            diarrhoea: Boolean!
        }
    `,
    resolvers: {

    }
}