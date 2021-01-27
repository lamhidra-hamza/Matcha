var connection = require('../../utils/db');
const { HTTP500Error } = require("../../utils/errorHandler");
var SqlString = require('sqlstring');


class Pictures {
    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    picture_1: data[0] ? data[0].filename : null,
                    picture_2: data[1] ? data[1].filename : null,
                    picture_3: data[2] ? data[2].filename : null,
                    picture_4: data[3] ? data[3].filename : null,
                    picture_5: data[4] ? data[4].filename : null
                };
                await connection.promise().query("INSERT INTO pictures SET ?", info);
                resolve(true);
            } catch (err) {
                reject(new HTTP500Error('internal Error db'));
            }
        })

    }

    async findall(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const [result, fields] = await connection
                    .promise()
                    .query(`SELECT * FROM pictures where user_id =${SqlString.escape(userId)}`);
                resolve(result)
            } catch (err) {
                reject(new HTTP500Error('internal Error db'));
            }
        })
    }

    async findOne(userId, id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM pictures WHERE user_id=${SqlString.escape(id)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result)
            } catch (err) {
                reject(new HTTP500Error('internal Error db'));
            }
        })
    }

    async findOneById(id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM pictures WHERE id=${SqlString.escape(id)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result)
            } catch (err) {
                reject(new HTTP500Error('internal Error db'));
            }
        })
    }

    async findOneAndUpdate(userId, id, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `UPDATE pictures SET ? WHERE id = ${SqlString.escape(id)}`;
                const [result, filed] = await connection.promise().query(sql, data);
                resolve(result)
            } catch (err) {
                reject(new HTTP500Error('internal Error db'));
            }
        })
    }

    async findOneAndRemove(userId, id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM pictures 
                    WHERE id = ${SqlString.escape(id)}
                    AND user_id=${SqlString.escape(userId)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result)
            } catch (err) {
                reject(new HTTP500Error('internal Error db'));
            }
        })
    }
}

module.exports = new Pictures;