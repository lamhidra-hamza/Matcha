var connection = require("../../utils/db");
const { HTTP500Error } = require("../../utils/errorHandler");
var SqlString = require('sqlstring');


class Notifications {
    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: data.notifiedId,
                    type: data.type,
                    readed: 0,
                    date: new Date().toISOString().slice(0, 19).replace("T", " "),
                };
                let ret = await connection.promise().query(SqlString.format('INSERT INTO notifications SET ?', info));
                resolve({ id: ret[0].insertId });
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'));
            }
        })

    }

    async findall(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const [result, fields] = await connection
                    .promise()
                    .query(`SELECT * FROM notifications where user_id=${SqlString.escape(userId)} AND readed='0'`);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'));
            }
        })
    }

    async findOne(userId, id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM notifications WHERE user_id=${SqlString.escape(userId)} AND id=${SqlString.escape(id)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'));
            }
        })
    }

    async findOneAndUpdate(userId, id, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `UPDATE notifications SET readed=${SqlString.escape(data.readed)} WHERE user_id= ${SqlString.escape(userId)} AND id=${SqlString.escape(id)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'));
            }
        })
    }

    async findOneAndRemove(userId, id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM notifications WHERE id= ${SqlString.escape(id)} AND user_id= ${SqlString.escape(userId)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'));
            }
        })
    }
}

module.exports = new Notifications();