const model = require("./chat.model");
const userModel = require("../users/user.model");
const { HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

// async function getChatLastUpdate(chatId) {
//     try {
//         const data = await model.findChatById(chatId);
//         if (!data) {
//             return null;
//         }
//         return data[0];
//     } catch (err) {
//         console.log(err);
//         return null;
//     }
// }

//
async function getMany(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(HttpStatusCode.OK)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            const body = req.query;
            if (body && !isNaN(body.startIndex) && !isNaN(body.length)) {
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
                res.status(HttpStatusCode.OK).json({
                    status: 1,
                    data: data,
                });
            } else throw new HTTP400Error('invalid query params');
        }
    } catch (err) {
        next(err);
    }
}

//get the last messages
async function getLastMessages(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(HttpStatusCode.OK)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            let body = req.query;
            let data;
            if (body && !isNaN(body.msgId)) {
                if (body.msgId == -1)
                    if (req.params && req.params.id &&
                        !isNaN(body.startIndex) && !isNaN(body.length)) {
                        data = await model.findLast(
                            req.params.id,
                            req.id,
                            body.startIndex,
                            body.length
                        );
                    } else throw new HTTP400Error('invalid req params id');
                else
                    data = await model.findOne(body.msgId);
                res.status(HttpStatusCode.OK).json({
                    status: 1,
                    data: data.reverse(),
                });
            } else throw new HTTP400Error('invalid query params');
        }
    } catch (err) {
        next(err);
    }
}

//get the last messages
async function accountStats(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(HttpStatusCode.OK)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            const data = await model.accountStats(
                req.id
            );
            res.status(HttpStatusCode.OK).json({
                status: 1,
                data: data[0],
            });
        }
    } catch (err) {
        next(err);
    }
}

//create ONe message
async function createOne(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(HttpStatusCode.OK)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            let body = req.body;
            if (body && body.content && body.date && req.params && req.params.id) {
                body.chat_id = req.params.id;
                const result = await model.create(req.id, body);
                res.status(HttpStatusCode.OK).send({
                    status: 1,
                    msg: "create Done!!",
                    id: result,
                });
            } else throw new HTTP400Error('invalid req params');
        }
    } catch (err) {
        next(err);
    }
}

//create ONe message
async function markMessageSeen(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(HttpStatusCode.OK)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            if (req.params && req.params.id) {
                const result = await model.markSeen(req.params.id);
                res.status(HttpStatusCode.OK).send({
                    status: 1,
                    id: result,
                });
            } else throw new HTTP400Error('invalid params id');
        }
    } catch (err) {
        next(err);
    }
}

//Create new Chat conversation
async function createNewChat(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(HttpStatusCode.OK)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            if (req.body && req.body.receiver_id) {
                await model.createChat(req.id, req.body);
                res.status(HttpStatusCode.OK).send({
                    status: 1,
                    msg: "create Done!!",
                });
            } else throw new HTTP400Error('invalid params');
        }
    } catch (err) {
        next(err);
    }
}

async function removeOne(req, res, next) {
    try {
        if (req.params && req.params.id) {
            await model.findOneAndRemove(req.id, req.params.id);
            res.status(HttpStatusCode.OK).send({
                msg: "Remove Done!!",
            });
        } else throw new HTTP400Error('invalid params');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    removeOne: removeOne,
    getMany: getMany,
    getLastMessages: getLastMessages,
    createOne: createOne,
    // getChatLastUpdate: getChatLastUpdate,
    createNewChat: createNewChat,
    accountStats: accountStats,
    markMessageSeen: markMessageSeen
};