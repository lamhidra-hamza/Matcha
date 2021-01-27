var express = require('express');
var router = express.Router();
var { createOne } = require('./views.controller')
const verify = require("../../utils/auth");


router.use(verify);

router.route('/')
    .post(createOne)

module.exports = router;