const {
    hashSync,
    genSaltSync
} = require('bcrypt');
const {
    create
} = require('./users.service');

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
    }
}