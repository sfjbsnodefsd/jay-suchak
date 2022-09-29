const {
    checkToken
} = require('../../middleware/auth');
const {
    createUser,
    getUsersData,
    getUsersDataById,
    updateUser,
    deleteUsersDataById,
    login
} = require('./users.controller');
const router = require('express').Router();

router.post('/add', createUser);
router.post('/login', login)

router.use(checkToken);

router.get('/getUsers', getUsersData)
router.get('/:id', getUsersDataById)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUsersDataById)


module.exports = router;