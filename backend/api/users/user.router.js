var express = require('express');
var router = express.Router();
var {controllers, signIn} = require('./user.controller');

router.route('/')
    .get(controllers.getMany)
    .post(controllers.createOne)

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

router.route('/signin').post(signIn);

module.exports = router;