var express = require('express');
var router = express.Router();
const { getMany, createOne, getOne, updateOne, removeOne } = require('./notifications.controller')
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