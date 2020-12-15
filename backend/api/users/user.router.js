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
} = require("./user.controller");

router.route("/gettoken").post(getToken);
router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/signout").post(signOut);
router.route("/signout").post(signOut);
router.route("/checksession").get(checkSession);

router.route("/:id")
    .get(getOne)
    .put(updateOne)
    .delete(removeOne);

router.route("/")
    .get(getMany)
    .post(createOne);

module.exports = router;
