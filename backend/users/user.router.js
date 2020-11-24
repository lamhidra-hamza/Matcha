var express = require('express');
var router = express.Router();
var controllers = require('./user.controller')

router.route('/')
    .get(controllers.getMany)
    .post()

router.route('/:id')
    .get()
    .put()
    .delete()

module.exports = router;