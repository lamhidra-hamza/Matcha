var express = require('express');
var router = express.Router();
var { getOne, createOne } = require('./likes.controller');
const verify = require("../../utils/auth");


router.use(verify);
router.route('/')
    .post(createOne)

router.route('/:id')
    .get(getOne)

module.exports = router;