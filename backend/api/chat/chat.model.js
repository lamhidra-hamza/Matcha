var connection = require("../../utils/db");
var uuid = require("uuid");
const SqlString = require('sqlstring');
const { HTTP500Error } = require("../../utils/errorHandler");


class Chat {
    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    sender_id: userId,
                    chat_id: data.chat_id,
                    content: data.content,
                    date: data.date,
                    seen: 0,
                };
                const [result, filed] = await connection
                    .promise()
                    .query(SqlString.format('INSERT INTO messages SET ?', info));

                await connection
                    .promise()
                    .query(
                        `UPDATE chat SET date = ${SqlString.escape(info.date)} WHERE chat_id = ${SqlString.escape(info.chat_id)}`);

                resolve(result.insertId);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    async createChat(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    receiver_id: data.receiver_id,
                    chat_id: uuid.v4(),
                    date: null,
                };
                await connection.promise().query(SqlString.format('INSERT INTO chat SET ?', info));
                resolve("done");
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    //find last conversations for the user
    async findall(userId, body) {
        return await new Promise(async(resolve, reject) => {
            try {
                const [result, fields] = await connection
                    .promise()
                    .query(
                        `SELECT
                        chat.chat_id,
                        chat.user_id,
                        chat.receiver_id,
                        messages.date,
                        messages.content,
                        messages.seen,
                        messages.id as messageId,
                        messages.sender_id 
                    FROM chat,messages,users
                        where messages.chat_id = chat.chat_id 
                        and (chat.receiver_id = ${SqlString.escape(userId)} OR chat.user_id = ${SqlString.escape(userId)})
                        and  messages.id IN (SELECT MAX(id) FROM messages GROUP by chat_id)
                    GROUP BY chat.chat_id, chat.user_id,
                        chat.receiver_id, messages.date,
                        messages.content, messages.seen
                    LIMIT ${body.startIndex},${body.length}`
                    );
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })

    }

    //find last conversations for the user
    async findOne(msgId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM messages WHERE id= ${SqlString.escape(msgId)}`;
                const [result, fields] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    //find the last messages in this conversation
    async findLast(chat_id, index, length) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM messages WHERE chat_id = ${SqlString.escape(chat_id)} ORDER BY date DESC LIMIT ${index}, ${length}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    async findChatById(chatId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM chat WHERE chat_id= ${SqlString.escape(chatId)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    async findOneAndRemove(userId, id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM chat WHERE id = ${id} AND user_id=${SqlString.escape(userId)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    async accountStats(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT (SELECT count(*) from messages,chat where messages.chat_id = chat.chat_id and (chat.user_id =  ${SqlString.escape(userId)} or chat.receiver_id =  ${SqlString.escape(userId)}) and messages.id in (SELECT MAX(id) FROM messages GROUP by chat_id) and sender_id != ${SqlString.escape(userId)} and seen = 0) as messages,
                (SELECT count(*) from matches WHERE matched_user = ${SqlString.escape(userId)}) as matches,
                (SELECT count(*) from likes WHERE  liked_user = ${SqlString.escape(userId)}) as likes,
                (Select count(*) from views WHERE viewed_user = ${SqlString.escape(userId)} ) as views`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }

    async markSeen(messageId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `UPDATE messages SET seen = 1 WHERE id = ?`;
                const [result, filed] = await connection.promise().query(SqlString.format(sql, [messageId]));
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal Error DB'))
            }
        })
    }
}

module.exports = new Chat();