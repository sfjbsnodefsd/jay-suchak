const {
    createUser, getUsersData, getUsersDataById, updateUser, deleteUsersDataById
} = require('./users.controller');
const router = require('express').Router();

router.post('/add', createUser);
router.get('/getUsers', getUsersData)
router.get('/:id', getUsersDataById)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUsersDataById)

module.exports =  router;