var express = require('express');
var router = express.Router();
var controllers = require('./likes.controller');
const verify = require("../../utils/auth");


router.use(verify);
router.route('/')
    .get(controllers.getMany)
    .post(controllers.createOne)

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

module.exports = router;