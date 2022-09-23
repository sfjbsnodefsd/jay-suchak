const router = require('express').Router();
const userModel = require('../models/users');
// get users
router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        return res.send(users)

    } catch (error) {
        res.send(error);
    }
})
//  add users
router.post('/add', async (req, res) => {
    try {
        let users = req.body;
        // users.birthdate = new Date(users.birthdate)
        console.log(users.birthdate);
        await userModel.create(users);
        return res.send({
            message: 'user is added',
            users
        })
    } catch (error) {
        res.send(error)
    }
})
module.exports = router;