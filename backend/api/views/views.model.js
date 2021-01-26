var connection = require('../../utils/db');
const { HTTP500Error, HttpStatusCode } = require("../../utils/errorHandler");
const SqlString = require('sqlstring');


class Views {

    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    viewed_user: data.viewed_user,
                };
                const result = await connection.promise().query(SqlString.format('INSERT INTO views SET ?', info));
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error db'));
            }
        })

    }

    // async findall(userId) {
    //     const [result, fields] = await connection.promise().query(`SELECT * FROM views where user='${userId}'`);
    //     return result;
    // }

    // async findOne(userId, id) {
    //     const sql = `SELECT * FROM views WHERE user='${userId}' AND id='${id}'`;
    //     const [result, filed] = await connection.promise().query(sql);
    //     return result;
    // }

    // async findOneAndUpdate(userId, id, data) {
    //     const sql = `UPDATE views SET viewed_user='${data.viewed_user}'
    //         WHERE id = '${id}' AND user='${userId}'`;
    //     const [result, filed] = await connection.promise().query(sql);
    //     return result;
    // }

    // async findOneAndRemove(userId, id) {
    //     const sql = `DELETE FROM views WHERE id = '${id}' AND user='${userId}'`;
    //     const [result, filed] = await connection.promise().query(sql);
    //     return result;
    // }
}

module.exports = new Views;