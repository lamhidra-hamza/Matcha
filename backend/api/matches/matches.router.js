var express = require('express');
var router = express.Router();
var { getMany, createOne, getOne, updateOne, removeOne, getAllInfo } = require('./matches.controller');
const verify = require("../../utils/auth");


router.use(verify);
router.route('/')
    .get(getMany)
    .post(createOne)

router.route('/chat/:id')
    .get(getAllInfo)

router.route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(removeOne)

module.exports = router;