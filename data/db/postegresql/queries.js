const {all, first} = require('../../../util/operators')

module.exports = {
    getAllDoctors: (pgPool) => {
        return all(pgPool.query('SELECT * FROM doctor ORDER BY name, surname'))
    },
    getPatientsOfDoctor: (pgPool, doctorId) => {
        return all(pgPool.query('SELECT * FROM patient WHERE doctor_fk = $1 ORDER BY name, name', [doctorId]))
    },
    getPatientsOfHospital: (pgPool, hospitalId) => {
        return all(pgPool.query('SELECT * FROM patient WHERE hospital_fk = $1 ORDER BY name, name', [hospitalId]))
    },
    getSymptomsOfPatient: (pgPool, patientId) => {
        return all(pgPool.query('SELECT * FROM symptoms WHERE patient_fk = $1', [patientId]))
    }
}