var express = require('express');
var router = express.Router();
var {controllers, signIn, signUp, signOut, checkuser} = require('./firstcheck.controller');

router.route('/')
    .get(checkuser)


module.exports = router;