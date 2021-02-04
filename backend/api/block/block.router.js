var express = require('express');
var router = express.Router();
var { removeOne,
     updateOne,
     getMany,
     getOne,
     createOne} = require('./block.controller')
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