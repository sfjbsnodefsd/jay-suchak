const {
    createUser
} = require('./users.controller');
const router = require('express').Router();

router.post('/add', createUser);

module.exports =  router;