const model = require("./chat.model");
const userModel = require("../users/user.model");

async function getChatLastUpdate(chatId) {
    try {
        const data = await model.findChatById(chatId);
        if (!data) {
            return null;
        }
        return data[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

//
async function getMany(req, res) {
    const body = req.query;
    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(200)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            let data = await model.findall(req.id, body);
            for (var i = 0; i < data.length; i++) {
                let receiver_id =
                    data[i].user_id == req.id ? data[i].receiver_id : data[i].user_id;
                let user = await userModel.findOneById(receiver_id);
                delete user[0].password;
                delete user[0].refreshToken;
                data[i] = {
                    ...data[i],
                    ...user[0],
                };
            }
            res.status(200).json({
                status: 1,
                data: data,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in updateOne`,
            status: 0,
        });
    }
}

//get the last messages
async function getLastMessages(req, res) {
    let body = req.query;

    console.log("the start index is ", body);
    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(200)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            let data;
            if (body.msgId == -1)
                data = await model.findLast(
                    req.params.id,
                    body.startIndex,
                    body.length
                );
            else {
                console.log("lets get the last one msg");
                data = await model.findOne(body.msgId);
                console.log("the result of this one msg is", data);
            }
            //data = data.slice(data.length - body.size, data.length - 1);
            res.status(200).json({
                status: 1,
                data: data.reverse(),
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in getLastMessages`,
            status: 0,
        });
    }
}


//get the last messages
async function accountStats(req, res) {
    let body = req.query;

    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(200)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            let data;
            data = await model.accountStats(
                    req.id
                );
            res.status(200).json({
                status: 1,
                data: data[0],
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in getLastMessages`,
            status: 0,
        });
    }
}


//create ONe message
async function createOne(req, res) {
    console.log("create one pictures");
    let body = req.body;
    body.chat_id = req.params.id;
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(200)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            let result = await model.create(req.id, body);
            console.log(result);
            res.status(201).send({
                status: 1,
                msg: "create Done!!",
                id: result,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            status: -2,
            msg: `Error in createOne`,
        });
    }
}

//create ONe message
async function markMessageSeen(req, res) {
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(200)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            let result = await model.markSeen(req.params.id);
            res.status(201).send({
                status: 1,
                id: result,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            status: -2,
            msg: `Error in createOne`,
        });
    }
}

//Create new Chat conversation
async function createNewChat(req, res) {
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(200)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            await model.createChat(req.id, req.body);
            res.status(201).send({
                status: 1,
                msg: "create Done!!",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            status: -1,
            msg: `Error in createOne`,
        });
    }
}

async function updateOne(req, res) {
    try {
        await model.findOneAndUpdate(req.id, req.id, req.body);
        res.status(201).send({
            msg: "Update Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in updateOne`,
        });
    }
}

async function removeOne(req, res) {
    try {
        await model.findOneAndRemove(req.id, req.params.id);
        res.status(201).send({
            msg: "Remove Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in removeOne`,
        });
    }
}

module.exports = {
    removeOne: removeOne,
    updateOne: updateOne,
    getMany: getMany,
    getLastMessages: getLastMessages,
    createOne: createOne,
    getChatLastUpdate: getChatLastUpdate,
    createNewChat: createNewChat,
    accountStats: accountStats,
    markMessageSeen: markMessageSeen
};