var express = require('express');
var router = express.Router();
var { createOne, getOne, updateOne, removeOne, getMany, getAll } = require('./tags.controller');
const verify = require("../../utils/auth");

router.use(verify);

router.route('/all').get(getAll);

router.route('/')
    .get(getMany)
    .post(createOne)

router.route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(removeOne)

module.exports = router;