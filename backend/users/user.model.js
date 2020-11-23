var connection = require('../utils/db');
var uuid = require('uuid')

class User {

    constructor() {
        let sql = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255), name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
        connection.query(sql, (err) => {
            if (err) throw err;
        })
    }

    create(data) {
        let info = {
            id: uuid.v4(),
            name: data.name,
            email: data.email,
            password: data.password
        };
        connection.query("INSERT INTO users SET ?", info, (err, result) => {
            if (err) throw err;
        })
    }

    findall() {
        connection.query(sql, (err) => {
            if (err) throw err;
        })
    }

    async findeOne(id) {
        let sql = `SELECT * FROM users WHERE id='${id}'`;
        let ret = {
            id: null,
            name: null,
            email: null,
            password: null,
        };
        let [result, fields] = await connection.promise().query(sql);
        return result[0];
    }
}

module.exports = new User;