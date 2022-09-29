const {
    hashSync,
    genSaltSync,
    compareSync
} = require('bcrypt');
const {
    create,
    getUsers,
    getUserById,
    update,
    deleteUserById,
    getUserByEmail
} = require('./users.service');
let {
    sign
} = require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
        let data = req.body;
        let salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        create(data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: 0,
                    message: 'Something wrong happened'
                })
            }
            return res.status(200).send({
                message: 'Created successfully',
                success: 1,
                results
            });
        })
    },
    getUsersData: (req, res) => {
        getUsers((err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: 0,
                    err
                })
            }
            return res.status(200).send({
                success: 1,
                data
            })
        })
    },
    getUsersDataById: (req, res) => {
        getUserById(req.params.id, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: 0,
                    err
                })
            }
            if (!data.length) {
                return res.send({
                    success: 1,
                    message: 'Record Not Found.'
                })
            }
            return res.status(200).send({
                success: 1,
                data: data[0]
            })
        })
    },
    updateUser: (req, res) => {
        let data = req.body;
        data.id = req.params.id;
        update(data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: 0,
                    message: 'Something wrong happened'
                })
            }
            console.log(results);
            if (results.affectedRows > 0) {
                return res.status(200).send({
                    message: 'Updated successfully',
                    success: 1,
                    results
                });
            } else {
                return res.status(200).send({
                    message: 'Not Updated',
                    success: 1,
                    results
                });
            }
        })
    },
    deleteUsersDataById: (req, res) => {
        deleteUserById(req.params.id, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: 0,
                    err
                })
            }
            return res.status(200).send({
                success: 1,
                data
            })
        })
    },
    login: (req, res) => {
        let body = req.body;
        getUserByEmail(body.email, (err, result) => {
            if (err) {
                return res.send({
                    success: 0,
                    error: err
                });
            }
            if (!result) {
                return res.send({
                    success: 0,
                    error: 'User not found'
                });
            }
            let passMatch = compareSync(body.password, result.password);
            if (passMatch) {
                result.password = "";
                let token = sign({
                    result
                }, process.env.JWT_KEY, {
                    expiresIn: '1h'
                });
                return res.send({
                    token,
                    success: 1,
                    message: 'Login Successfully'
                })
            } else {
                return res.send({
                    success: 0,
                    message: 'Wrong password'
                })
            }
        })
    }
}