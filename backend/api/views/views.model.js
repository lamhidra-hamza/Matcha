var connection = require('../../utils/db');
var uuid = require('uuid')

class Views {

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
            user: userId,
            viewed_user: data.viewed_user,
        };
        await connection.promise().query("INSERT INTO views SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM views where user='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM views WHERE user='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE views SET viewed_user='${data.viewed_user}'
            WHERE id = '${id}' AND user='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM views WHERE id = '${id}' AND user='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Views;