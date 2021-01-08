var express = require("express");
var router = express.Router();
const verify = require("../../utils/auth");
const { route } = require("../tags/tags.router");

var {
  removeOne,
  updateOne,
  getMany,
  getLastMessages,
  createOne,
  createNewChat,
} = require("./chat.controller");

router.route("/new").post(verify, createNewChat); //create New chat

router
  .route("/:id")
  .get(verify, getLastMessages) // get message from this chat
  .put(updateOne)
  .delete(removeOne)
  .post(verify, createOne); //create one message


router.route("/")
  .get(verify, getMany)
  .post(createOne);

module.exports = router;
