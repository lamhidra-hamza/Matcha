var connection = require("../../utils/db");

class Notifications {
    async create(userId, data) {
        let info = {
            user_id: data.notifiedId,
            type: data.type,
            readed: 0,
            date: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
        let ret = await connection.promise().query("INSERT INTO notifications SET ?", info);
        return { id: ret[0].insertId };
    }

    async findall(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM notifications where user_id='${userId}' AND readed='0'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM notifications WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE notifications SET readed='${data.readed}' WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM notifications WHERE id='${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Notifications();