const humps = require('humps')

function all(query) {
    return query.then(res => humps.camelizeKeys(res.rows))
}

function first(query) {
    return query.then(res => res.rows.length > 0 ? humps.camelizeKeys(res.rows[0]) : {})
}

module.exports = {
    all,
    first
}