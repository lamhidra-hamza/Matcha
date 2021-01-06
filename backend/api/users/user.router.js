var express = require("express");
var router = express.Router();
const verify = require("../../utils/auth");
var {
    signIn,
    signUp,
    signOut,
    getToken,
    checkSession,
    getOne,
    updateOne,
    removeOne,
    getMany,
    createOne,
    getOneForInfoCard,
} = require("./user.controller");

router.route("/gettoken").post(getToken);
router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/signout").post(signOut);
router.route("/checksession").get(checkSession);
router.route("/infocard/:id").get(verify, getOneForInfoCard)

router.route("/:id")
    .get(verify, getOne)
    .put(verify, updateOne)
    .delete(verify, removeOne);

router.route("/")
    .get(verify, getMany)
    .post(verify, createOne);

module.exports = router;