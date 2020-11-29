const {
    createUser
} = require('./user.controller');
const router = require('express').Router();

router.post('/create', createUser);
module.exports = router;