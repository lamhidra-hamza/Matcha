var express = require('express');
var router = express.Router();
var { createOne } = require('./views.controller')
const verify = require("../../utils/auth");


router.use(verify);

router.route('/')
    // .get(controllers.getMany)
    .post(createOne)

// router.route('/:id')
//     .get(controllers.getOne)
//     .put(controllers.updateOne)
//     .delete(controllers.removeOne)

module.exports = router;