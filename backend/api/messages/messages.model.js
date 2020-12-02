var connection = require('../../utils/db');
var uuid = require('uuid');

class Messages {

    async create(userId, data) {
        let info = {
            chat_id: data.chat_id,
            content: data.content,
            sender_id: data.sender_id,
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await connection.promise().query("INSERT INTO messages SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM messages`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM messages WHERE id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        // const sql = `UPDATE messages SET 
        //     longitude='${data.longitude}', latitude='${data.latitude}'
        //     WHERE id = '${id}' AND user_id='${userId}'`;
        // const [result, filed] = await connection.promise().query(sql);
        // return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM messages WHERE id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Messages;