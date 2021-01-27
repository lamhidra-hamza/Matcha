var express = require('express');
var router = express.Router();
const verify = require('../../utils/auth');
var { createOne, getOne, updateOne } = require('./location.controller')

router.route('/')
    .post(createOne)

router.route('/:id')
    .get(verify, getOne)
    .put(verify, updateOne)

module.exports = router;