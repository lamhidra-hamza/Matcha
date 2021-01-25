var connection = require('../../utils/db');
var uuid = require('uuid');
var SqlString = require('sqlstring');


class Pictures {
    async create(userId, data) {
        let info = {
            user_id: userId,
            picture_1: data[0] ? data[0].filename : null,
            picture_2: data[1] ? data[1].filename : null,
            picture_3: data[2] ? data[2].filename : null,
            picture_4: data[3] ? data[3].filename : null,
            picture_5: data[4] ? data[4].filename : null
        };
        await connection.promise().query(SqlString.format('INSERT INTO pictures SET ?', info));
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM pictures where user_id = ${SqlString.escape(userId)} `);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM pictures WHERE user_id= ${SqlString.escape(id)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneById(id) {
        const sql = `SELECT * FROM pictures WHERE id=${SqlString.escape(id)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE pictures SET ? WHERE id = ${SqlString.escape(id)}`;
        const [result, filed] = await connection.promise().query(sql, data);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM pictures WHERE id = ${SqlString.escape(id)} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Pictures;