var connection = require('../../utils/db');
var uuid = require('uuid')
const SqlString = require('sqlstring');


class Block {

    constructor() {
        // const sql = `CREATE TABLE IF NOT EXISTS users (id VARCHAR(255),
        //     name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))`;
        // connection.query(sql, (err) => {
        //     if (err) throw err;
        // })
    }

    async create(userId, data) {
        console.log(data);
        let info = {
            user_id: userId,
            blocked_user: data.blocked_user,
        };
        await connection.promise().query(SqlString.format('INSERT INTO block SET ?', info));
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM block where user_id=${SqlString.escape(userId)}`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM block WHERE user_id=${SqlString.escape(userId)} AND id=${id}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE block SET blocked_user = ${SqlString.escape(data.blocked_user)}
            WHERE id = ${id} AND user_id = ${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM block WHERE id = ${id} AND user_id = ${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Block;