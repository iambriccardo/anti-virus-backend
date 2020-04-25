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

    type Mutation {
        movePatientToHospital(patientId: Int, hospitalId: Int): Patient!
        movePatientToDoctor(patientId: Int, doctorId: Int): Patient!
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
    },

    Mutation: {
        movePatientToHospital: async (obj, {patientId, hospitalId}, {pgPool}) => {
            return  queries.movePatientToHospital(pgPool, patientId, hospitalId);
        },
        movePatientToDoctor: (obj, {patientId, doctorId}, {pgPool}) => {
            return queries.movePatientToDoctor(pgPool, patientId, doctorId);
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