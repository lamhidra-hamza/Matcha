var connection = require('../../utils/db');
const SqlString = require('sqlstring');
const { HTTP500Error } = require("../../utils/errorHandler");


class Block {

    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    blocked_user: data.blocked_user,
                };
                await connection.promise().query(SqlString.format('INSERT INTO block SET ?', info));
                resolve("done");
            } catch {
                reject(new HTTP500Error('internal Error DB'));
            }
        })

    }

    // async findall(userId) {
    //     const [result, fields] = await connection.promise().query(`SELECT * FROM block where user_id=${SqlString.escape(userId)}`);
    //     return result;
    // }

    // async findOne(userId, id) {
    //     const sql = `SELECT * FROM block WHERE user_id=${SqlString.escape(userId)} AND id=${id}`;
    //     const [result, filed] = await connection.promise().query(sql);
    //     return result;
    // }

    // async findOneAndUpdate(userId, id, data) {
    //     const sql = `UPDATE block SET blocked_user = ${SqlString.escape(data.blocked_user)}
    //         WHERE id = ${id} AND user_id = ${SqlString.escape(userId)}`;
    //     const [result, filed] = await connection.promise().query(sql);
    //     return result;
    // }

    // async findOneAndRemove(userId, id) {
    //     const sql = `DELETE FROM block WHERE id = ${id} AND user_id = ${SqlString.escape(userId)}`;
    //     const [result, filed] = await connection.promise().query(sql);
    //     return result;
    // }
}

module.exports = new Block;