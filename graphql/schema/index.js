const {ApolloServer, gql} = require('apollo-server-express');
const pgPool = require("../../data/db/postegresql/pool");
const queries = require('../../data/db/postegresql/queries')
const doctor = require('./doctor')
const hospital = require('./hospital')
const patient = require('./patient')
const symptom = require('./symptom')

const rootTypeDefs = gql`
    type Query {
        doctors(input: FilterDoctorsInput): [Doctor!]
        patientsOfDoctor(doctorId: Int): [Patient!]
        patientsOfHospital(hospitalId: Int): [Patient!]
        symptomsOfPatient(patientId: Int): [Symptom!]
    }
`;

const rootResolvers = {
    Query: {
        doctors: (obj, args, {pgPool}) => {
            return queries.getAllDoctors(pgPool);
        },
        patientsOfDoctor: (obj, {doctorId}, {pgPool}) => {
            return queries.getPatientsOfDoctor(pgPool, doctorId);
        },
        patientsOfHospital: (obj, {hospitalId}, {pgPool}) => {
            return queries.getPatientsOfHospital(pgPool, hospitalId);
        },
        symptomsOfPatient: (obj, {patientId}, {pgPool}) => {
            return queries.getSymptomsOfPatient(pgPool, patientId);
        }
    }
};

module.exports = {
    schema: new ApolloServer({
        typeDefs: [rootTypeDefs, patient.typeDefs, symptom.typeDefs, doctor.typeDefs, hospital.typeDefs],
        resolvers: [rootResolvers, patient.resolvers, symptom.resolvers, doctor.resolvers, hospital.resolvers],
        context: {
            pgPool
        },
        introspection: true,
        playground: true
    })
}