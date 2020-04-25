const { all, first } = require('../../../util/operators')

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
    },
    movePatientToHospital: (pgPool, patientId, hospitalId) => {
        return first(pgPool.query('UPDATE patient SET doctor_fk = null, hospital_fk = $1 WHERE id = $2 RETURNING *', [hospitalId, patientId]))
    },
    movePatientToDoctor: (pgPool, patientId, hospitalId) => {
        pgPool.query('UPDATE patient SET doctor_fk = null WHERE id = $1', [patientId])
        pgPool.query('UPDATE patient SET hospital_fk = $1 WHERE id = $2', [hospitalId, patientId])
        return all(pgPool.query('SELECT * FROM patient WHERE id = $1', [patientId]))
    }
}