var connection = require('../../utils/db');
var SqlString = require('sqlstring');


class Likes {

    async create(userId, data) {
        console.log(data);
        let info = {
            user_id: userId,
            liked_user: data.liked_user,
            date: new Date().toISOString().slice(0, 19).replace("T", " ")
        };
        await connection.promise().query(SqlString.format('INSERT INTO likes SET ?', info));
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM likes where user_id=${SqlString.escape(userId)}`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM likes WHERE user_id='${SqlString.escape(id)}' AND liked_user=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE likes SET liked_user=${SqlString.escape(data.liked_user)}
            WHERE id = ${id} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM likes WHERE id = ${id} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Likes;