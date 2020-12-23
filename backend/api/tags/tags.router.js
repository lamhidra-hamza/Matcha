var express = require('express');
var router = express.Router();
var { createOne, getOne, updateOne, removeOne, getMany } = require('./tags.controller');
const verify = require("../../utils/auth");

router.use(verify);

router.route('/')
    .get(getMany)
    .post(createOne)

router.route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(removeOne)

module.exports = router;