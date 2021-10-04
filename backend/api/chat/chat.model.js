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
                reject(new HTTP500Error('Internal Server Error'))
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
                const sql = `
                INSERT INTO chat (user_id, receiver_id, chat_id, date) SELECT ${SqlString.escape(userId)}, ${SqlString.escape(data.receiver_id)}, '${uuid.v4()}', null 
        WHERE (SELECT COUNT(*) FROM chat WHERE ((user_id=${SqlString.escape(userId)} AND receiver_id=${SqlString.escape(data.receiver_id)}) OR (receiver_id=${SqlString.escape(userId)} AND chat_id=${SqlString.escape(data.receiver_id)}))) = 0
                `;
                await connection.promise().query(sql);
                resolve("done");
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'))
            }
        })
    }

    //find last conversations for the user
    async findall(userId, body) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT
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
                    AND chat.receiver_id NOT IN (SELECT blocked_user FROM block WHERE user_id=${SqlString.escape(userId)})
                    AND chat.receiver_id NOT IN (SELECT user_id FROM block WHERE blocked_user=${SqlString.escape(userId)})
                    AND chat.user_id NOT IN (SELECT blocked_user FROM block WHERE user_id=${SqlString.escape(userId)})
                    AND chat.user_id NOT IN (SELECT user_id FROM block WHERE blocked_user=${SqlString.escape(userId)})

                    and (chat.receiver_id = ${SqlString.escape(userId)} OR chat.user_id = ${SqlString.escape(userId)})
                    and (
                        ((SELECT count(*) from matches where matches.user_id = ${SqlString.escape(userId)} and matches.matched_user = chat.user_id ) = 1)
                        or 
                        ((SELECT count(*) from matches where matches.user_id = ${SqlString.escape(userId)} and matches.matched_user = chat.receiver_id ) = 1)
                        OR
                        ((SELECT count(*) from matches where matches.matched_user = ${SqlString.escape(userId)} and matches.matched_user = chat.receiver_id ) = 1)
                        OR
                        ((SELECT count(*) from matches where matches.matched_user = ${SqlString.escape(userId)} and matches.matched_user = chat.user_id ) = 1)
                        )
                    and  messages.id IN (SELECT MAX(id) FROM messages GROUP by chat_id)
                GROUP BY chat.chat_id, chat.user_id,
                    chat.receiver_id, messages.date,
                    messages.content, messages.seen ORDER BY chat.date DESC
                LIMIT ${body.startIndex},${body.length}`;

                const [result, fields] = await connection
                    .promise()
                    .query(sql);

                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'))
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
                reject(new HTTP500Error('Internal Server Error'))
            }
        })
    }

    //find the last messages in this conversation
    async findLast(chat_id, userId, index, length) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM messages WHERE chat_id = ${SqlString.escape(chat_id)} ORDER BY date DESC LIMIT ${index}, ${length}`;
                const updateSeen = `UPDATE messages set seen = 1 where id in (SELECT * FROM (SELECT max(id) FROM messages WHERE chat_id = ${SqlString.escape(chat_id)} and sender_id != ${SqlString.escape(userId)}) as T)`;
                await connection.promise().query(updateSeen);
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'))
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
                reject(new HTTP500Error('Internal Server Error'))
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
                reject(new HTTP500Error('Internal Server Error'))
            }
        })
    }

    async accountStats(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sqlChatId = `SELECT messages.chat_id from messages,chat where messages.chat_id = chat.chat_id and (chat.user_id =  ${SqlString.escape(userId)} or chat.receiver_id =  ${SqlString.escape(userId)}) and messages.id in (SELECT MAX(id) FROM messages GROUP by chat_id) and sender_id != ${SqlString.escape(userId)} and seen = 0`;
                const [chatIds, filedId] = await connection.promise().query(sqlChatId);
                const sql = `SELECT (SELECT count(*) from matches WHERE matched_user = ${SqlString.escape(userId)}) as matches,
                (SELECT count(*) from likes WHERE  liked_user = ${SqlString.escape(userId)}) as likes,
                (Select count(*) from views WHERE viewed_user = ${SqlString.escape(userId)} ) as views`;
                const [result, filed] = await connection.promise().query(sql);
                result[0].messages = chatIds;
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'))
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
                reject(new HTTP500Error('Internal Server Error'))
            }
        })
    }
}

module.exports = new Chat();