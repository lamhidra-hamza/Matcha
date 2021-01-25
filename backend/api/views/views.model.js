var connection = require('../../utils/db');
var uuid = require('uuid')
const SqlString = require('sqlstring');


class Views {

    async create(userId, data) {
        console.log(data);
        let info = {
            user_id: userId,
            viewed_user: data.viewed_user,
        };
        await connection.promise().query(SqlString.format('INSERT INTO views SET ?', info));
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM views where user=${SqlString.escape(userId)}`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM views WHERE user=${SqlString.escape(userId)} AND id=${SqlString.escape(id)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE views SET viewed_user=${SqlString.escape(data.viewed_user)}
            WHERE id = ${SqlString.escape(id)} AND user= ${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM views WHERE id = ${SqlString.escape(id)} AND user=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Views;