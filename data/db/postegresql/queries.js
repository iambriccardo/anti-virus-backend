const { all, first } = require('../../../util/operators')

module.exports = {
    getAllDoctors: (pgPool) => {
        return all(pgPool.query('SELECT * FROM doctor ORDER BY name, surname'))
    },
    getSingleDoctor: (pgPool, doctorName) => {
        return first(pgPool.query('SELECT * FROM doctor WHERE name = $1', [doctorName]))
    },
    getPatientsOfDoctor: (pgPool, doctorId) => {
        return all(pgPool.query('SELECT * FROM patient WHERE doctor_fk = $1 ORDER BY name, name', [doctorId]))
    },
    getPatientsOfHospital: (pgPool, hospitalId) => {
        return all(pgPool.query('SELECT * FROM patient WHERE hospital_fk = $1 ORDER BY name, name', [hospitalId]))
    },
    getSymptomsOfPatient: (pgPool, patientId) => {
        return all(pgPool.query('SELECT * FROM symptoms WHERE patient_fk = $1', [patientId]))
    },
    movePatientToHospital: (pgPool, patientId, hospitalId) => {
        return first(pgPool.query('UPDATE patient SET doctor_fk = null, hospital_fk = $1 WHERE id = $2 RETURNING *', [hospitalId, patientId]))
    },
    movePatientToDoctor: (pgPool, patientId, doctorId) => {
        return first(pgPool.query('UPDATE patient SET doctor_fk = $1, hospital_fk = null WHERE id = $2 RETURNING *', [doctorId, patientId]))
    }
}