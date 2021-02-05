var express = require("express");
var router = express.Router();
const verify = require("../../utils/auth");

var {
    removeOne,
    getMany,
    getLastMessages,
    createOne,
    accountStats,
    createNewChat,
    markMessageSeen
} = require("./chat.controller");

router.use(verify);

router.route("/new").post(createNewChat); //create New chat

router.route("/count").get(accountStats); //count unread messages

router.route("/markseen/:id").post(markMessageSeen);

router
    .route("/:id")
    .get(getLastMessages) // get message from this chat
    .delete(removeOne)
    .post(createOne); //create one message


router.route("/")
    .get(getMany) //

module.exports = router;