var connection = require("../../utils/db");
var uuid = require("uuid");

class Chat {
    async create(userId, data) {
        let info = {
            user_id: userId,
            receiver_id: data.receiver_id,
            chat_id: uuid.v4(),
            date: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
        await connection.promise().query("INSERT INTO chat SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM chat where user_id ='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM chat WHERE user_id='${userId}' AND id='${id}'`;
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
        const sql = `DELETE FROM chat WHERE id = '${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Chat();