var express = require('express');
var router = express.Router();
var controllers = require('./notifications.controller')

router.route('/')
    .get(controllers.getMany)
    .post(controllers.createOne)

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

module.exports = router;