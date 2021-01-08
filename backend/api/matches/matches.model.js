var connection = require('../../utils/db');

class Matches {

    async create(userId, data) {
        console.log(data);
        let info = {
            user_id: userId,
            matched_user: data.matched_user,
            date: new Date().toISOString().slice(0, 19).replace("T", " ")
        };
        await connection.promise().query("INSERT INTO matches SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM matches where user_id='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM matches WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE matches SET matched_user='${data.matched_user}'
            WHERE id = '${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM matches WHERE id='${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Matches;