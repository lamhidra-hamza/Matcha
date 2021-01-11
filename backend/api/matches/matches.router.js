var express = require('express');
var router = express.Router();
var { getMany, createOne, getOne, updateOne, removeOne } = require('./matches.controller');
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