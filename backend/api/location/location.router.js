var express = require('express');
var router = express.Router();
const verify = require('../../utils/auth');
var {getMany, createOne, getOne, updateOne, removeOne} = require('./location.controller')

router.route('/')
    .get(getMany)
    .post(createOne)

router.route('/:id')
    .get(verify, getOne)
    .put(verify, updateOne)
    .delete(removeOne)

module.exports = router;