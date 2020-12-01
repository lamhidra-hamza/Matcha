var connection = require('../../utils/db');
var uuid = require('uuid')

class User {

    constructor() {
        // const sql = `CREATE TABLE IF NOT EXISTS users (id VARCHAR(255),
        //     name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))`;
        // connection.query(sql, (err) => {
        //     if (err) throw err;
        // })
    }

    async create(data) {
        let info = {
            id: uuid.v4(),
            username: data.username,
            email: data.email,
            password: data.password
        };
        await connection.promise().query("INSERT INTO users SET ?", info);
    }

    async findall() {
        const [result, fields] = await connection.promise().query("SELECT * FROM users");
        return result;
    }

    async findOne(id) {
        const sql = `SELECT * FROM users WHERE id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(id, data) {
        const sql = `UPDATE users SET username = '${data.username}', email = '${data.email}',
            password = '${data.password}' WHERE id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(id) {
        const sql = `DELETE FROM users WHERE id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new User;