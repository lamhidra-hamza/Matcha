var connection = require("../../utils/db");
var uuid = require("uuid");
const SqlString = require('sqlstring');


class Chat {
    async create(userId, data) {
        console.log(`create function is `, data);
        let info = {
            sender_id: userId,
            chat_id: data.chat_id,
            content: data.content,
            date: data.date,
            seen: 0,
        };
        console.log("the info are", info);
        const [result, filed] = await connection
            .promise()
            .query(SqlString.format('INSERT INTO messages SET ?', info));

        await connection
            .promise()
            .query(
                `UPDATE chat SET date = ${SqlString.escape(info.date)} WHERE chat_id = ${SqlString.escape(info.chat_id)}`);

        return result.insertId;
    }

    async createChat(userId, data) {
        let info = {
            user_id: userId,
            receiver_id: data.receiver_id,
            chat_id: uuid.v4(),
            date: null,
        };
        await connection.promise().query(SqlString.format('INSERT INTO chat SET ?', info));
    }

    //find last conversations for the user
    async findall(userId, body) {
        console.log("findall function and the user is", userId, "and the data is", body);
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
        return result;
    }

    //find last conversations for the user
    async findOne(msgId) {
        console.log("the findONe function and the msgId is ", msgId);
        const sql = `SELECT * FROM messages WHERE id= ${SqlString.escape(msgId)}`;
        const [result, fields] = await connection.promise().query(sql);
        return result;
    }

    //find the last messages in this conversation
    async findLast(chat_id, index, length) {
        const sql = `SELECT * FROM messages WHERE chat_id = ${SqlString.escape(chat_id)} ORDER BY date DESC LIMIT ${index}, ${length}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findChatById(chatId) {
        const sql = `SELECT * FROM chat WHERE chat_id= ${SqlString.escape(chatId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        // const sql = `UPDATE chat SET
        //     viewed_user='${data.viewed_user}'
        //     WHERE id = '${id}' AND user='${userId}'`;
        // const [result, filed] = await connection.promise().query(sql);
        // return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM chat WHERE id = ${id} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async accountStats(userId) {
        const sql = `SELECT (SELECT count(*) from messages,chat where messages.chat_id = chat.chat_id and (chat.user_id =  ${SqlString.escape(userId)} or chat.receiver_id =  ${SqlString.escape(userId)}) and messages.id in (SELECT MAX(id) FROM messages GROUP by chat_id) and sender_id != ${SqlString.escape(userId)} and seen = 0) as messages,
        (SELECT count(*) from matches WHERE user_id = ${SqlString.escape(userId)} or matched_user = ${SqlString.escape(userId)}) as matches,
        (SELECT count(*) from likes WHERE user_id = ${SqlString.escape(userId)} or liked_user = ${SqlString.escape(userId)}) as likes,
        (Select count(*) from views WHERE user_id = ${SqlString.escape(userId)} OR viewed_user = ${SqlString.escape(userId)} ) as views`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async markSeen (messageId){
        const sql = `UPDATE messages SET seen = 1 WHERE id = ?`;
        const [result, filed] = await connection.promise().query(SqlString.format(sql, [messageId]));
        return result;
    }
}

module.exports = new Chat();