const {
    createUser, getUsersData, getUsersDataById
} = require('./users.controller');
const router = require('express').Router();

router.post('/add', createUser);
router.get('/getUsers', getUsersData)
router.get('/:id', getUsersDataById)

module.exports =  router;