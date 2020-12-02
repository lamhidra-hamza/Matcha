var connection = require('../../utils/db');
var uuid = require('uuid');

class Notifications {

    async create(userId, data) {
        let info = {
            user_id: userId,
            type: data.type,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        await connection.promise().query("INSERT INTO notifications SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM notifications where user_id='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM notifications WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        // const sql = `UPDATE notifications SET 
        //     longitude='${data.longitude}', latitude='${data.latitude}'
        //     WHERE id = '${id}' AND user_id='${userId}'`;
        // const [result, filed] = await connection.promise().query(sql);
        // return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM notifications WHERE id='${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Notifications;