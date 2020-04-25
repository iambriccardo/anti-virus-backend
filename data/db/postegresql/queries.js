const {all, first} = require('../../../util/operators')

module.exports = {
    getAllDoctors: (pgPool) => {
        return all(pgPool.query('SELECT * FROM doctor ORDER BY name, surname'))
    },
    getSymptomsByPatient: (pgPool, patientId) => {
        return all(pgPool.query('SELECT * FROM symptoms WHERE patient_fk = $1', [patientId]))
    }
}