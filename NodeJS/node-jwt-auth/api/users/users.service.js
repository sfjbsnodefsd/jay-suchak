// database connect
const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`insert into registration (firstName, lastName, number, gender, email, password) 
        values(?, ?, ?, ?, ?, ?)`,
            [
                data.fistName,
                data.lastName,
                data.number,
                data.gender,
                data.email,
                data.password
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results);

            })
    },
    getUsers: callback => {
        pool.query(`select * from registration`, [], (err, data, fields) => {
            if (err) {
                return callback(err)
            }
            return callback(null, data);
        })
    },

    getUserById: (id, callback) => {
        pool.query(`select * from registration where id= ?`, [id], (err, data, fields) => {
            if (err) {
                return callback(err)
            }
            return callback(null, data);
        })
    }
}