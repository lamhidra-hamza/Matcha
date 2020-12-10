var express = require('express');
var router = express.Router();
const verify = require("../../utils/auth");
var {controllers, signIn, signUp, signOut, getToken, checkSession} = require('./user.controller');

router.route('/gettoken').post(getToken);
router.route('/signin').post(signIn);
router.route('/signup').post(signUp);
router.route('/signout').post(signOut);
router.route('/signout').post(signOut);
router.route('/checksession').get(checkSession);

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

router.route('/')
    .get(controllers.getMany)
    .post(controllers.createOne)






module.exports = router;