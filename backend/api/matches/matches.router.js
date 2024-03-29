var express = require('express');
var router = express.Router();
var { getMany, createOne, getAllInfo, deleteOne } = require('./matches.controller');
const verify = require("../../utils/auth");


router.use(verify);
router.route('/')
    .get(getMany)
    .post(createOne)
    .put(deleteOne)

router.route('/chat/:id')
    .get(getAllInfo)



module.exports = router;