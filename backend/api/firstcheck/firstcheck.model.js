var connection = require("../../utils/db");
var uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var SqlString = require('sqlstring');


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
      password: await bcrypt.hash(data.password, 11),
      biography: "",
      gender: "men",
      lastConnection: new Date().toISOString().slice(0, 19).replace("T", " "),
      lastNotification: new Date().toISOString().slice(0, 19).replace("T", " "),
      interessted: "both",
    };
    await connection.promise().query(SqlString.format('INSERT INTO users SET ?', info));
    
    return { name: "zakaria", user: "nadi", id : info.id };
  }

  async findall(userId) {
    const [result, fields] = await connection
      .promise()
      .query("SELECT * FROM users");
    return result;
  }

  async findOne(userId, email) {
    const sql = `SELECT * FROM users WHERE email=${SqlString.escape(email)}`;
    const [result, filed] = await connection.promise().query(sql);
    return result;
  }

  async findOneAndUpdate(userId, id, data) {
    const sql = `UPDATE users SET username = ${SqlString.escape(data.username)}, email = ${SqlString.escape(data.email)},
            password = ${SqlString.escape(data.password)} WHERE id = ${SqlString.escape(id)}`;
    const [result, filed] = await connection.promise().query(sql);
    return result;
  }

  async findOneAndRemove(userId, id) {
    const sql = `DELETE FROM users WHERE id = ${SqlString.escape(id)}`;
    const [result, filed] = await connection.promise().query(sql);
    return result;
  }
}

module.exports = new User();
