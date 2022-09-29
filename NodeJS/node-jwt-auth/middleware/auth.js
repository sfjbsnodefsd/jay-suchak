const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.headers.token || req.get('authorization');
        token =  token.slice(7)
        if (!token) {
            return res.send({
                sucess: 0,
                message: 'Unauthorize access'
            })
        }
        verify(token, process.env.JWT_KEY, {}, (err, token) => {
            if (err) {
                return res.send({
                    sucess: 0,
                    error: err
                })
            }
            if (!token) {
                return res.send({
                    sucess: 0,
                    message: 'Unauthorize access'
                })
            } else {
                next();
            }
        })
    }
}