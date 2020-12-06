var express = require('express');
var router = express.Router();
var {controllers, signIn, signUp, signOut, checkuser} = require('./firstcheck.controller');
const headerConfig = require('../../utils/header');


router.route('/', headerConfig,)
    .get(checkuser)


module.exports = router;