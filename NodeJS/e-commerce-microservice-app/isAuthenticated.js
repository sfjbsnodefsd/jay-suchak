const jwt = require('jsonwebtoken');

export async function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, 'seceret', (err, user) => {
        if (err) {
            return res.send({
                sucess: 0,
                err: 'Unauthorized'
            });
        } else {
            req.user = user;
            next();
        }
    })
}