var express = require('express');
var router = express.Router();
const verify = require('../../utils/auth');
var { getMany, createOne, getOne, updateOne, removeOne } = require('./location.controller')

router.route('/')
    .get(verify, getMany)
    .post(createOne)

router.route('/:id')
    .get(verify, getOne)
    .put(verify, updateOne)
    .delete(verify, removeOne)

module.exports = router;