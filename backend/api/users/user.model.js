var connection = require("../../utils/db");
var uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {

    async create(data) {
        let info = {
            id: uuid.v4(),
            username: data.username,
            email: data.email,
            password: await bcrypt.hash(data.password, 11),
            biography: "",
            gender: "men",
            firstName: data.firstName,
            lastName: data.lastName,
            minAge: 18,
            maxAge: 30,
            maxDistance: 150,
            lastConnection: new Date().toISOString().slice(0, 19).replace("T", " "),
            lastNotification: new Date().toISOString().slice(0, 19).replace("T", " "),
            interessted: "both",
            verified: false,
            infoCompleted: false,
        };
        await connection.promise().query("INSERT INTO users SET ?", info);

        return { name: "zakaria", user: "nadi", id: info.id };
    }

    async updateRefreshToken(userId, refreshToken) {
        const sql = `UPDATE users SET
       refreshToken = '${refreshToken}'
       WHERE id = '${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findall(userId) {
        const [result, fields] = await connection
            .promise()
            .query("SELECT * FROM users ");
        return result;
    }

    async findOneById(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM users WHERE id = '${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM users WHERE id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneByEmail(userId, email) {
        const sql = userId ? `SELECT * FROM users WHERE id='${userId}'` : `SELECT * FROM users WHERE email='${email}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE users SET
             username = '${data.username}', 
             email = '${data.email}',
            password = '${data.password}',
            biography= '${data.biography}',
            gender= '${data.gender}',
            interessted= '${data.interessted}',
            firstName='${data.firstName}',
            lastName='${data.lastName}',
            minAge='${data.minAge}',
            maxAge='${data.maxAge}',
            maxDistance='${data.maxDistance}',
            verified='${data.verified}'
            where id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM users WHERE id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new User();