var connection = require("../../utils/db");
var uuid = require("uuid");
const bcrypt = require("bcrypt");

class User {

    async create(data) {
        let info = {
            id: uuid.v4(),
            username: data.username,
            email: data.email,
            password: await bcrypt.hash(data.password, 11),
            biography: "",
            gender: "men",
            job: "",
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
            bornDate: data.bornDate.slice(0, 19).replace("T", " ")
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
        // SELECT users.id, COUNT(tag) from users
        // INNER JOIN tags ON tags.user_id=users.id
        // INNER JOIN tag_content ON tag_content.id=tags.tag_id
        // WHERE tag_content.tag IN ('swiming', 'coding')
        // GROUP BY users.id
        // HAVING COUNT(tag) > 0

    // SELECT users.id,
    // COUNT(tag),
    // users.firstName,
    // TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
    // pictures.picture_1
    // from users
    // INNER JOIN tags ON tags.user_id=users.id
    // INNER JOIN tag_content ON tag_content.id=tags.tag_id
    // INNER JOIN pictures ON pictures.user_id=users.id
    // WHERE tag_content.tag IN ('swiming', 'coding', 'traveling')
    // GROUP BY users.id, pictures.picture_1, users.firstName
    // HAVING age BETWEEN ${filters.minAge} AND ${filters.maxAge} AND COUNT(tag) > 0 AND users.id !='${userId}'
    // ORDER BY `COUNT(tag)`  DESC
    // LIMIT 0, 5


    // query("IN (?)", [])
    // filter?page=1
    // 5 * (page - 1), 5

    async findall(userId, filters) {
        const injectedString = filters.tags.map(c => `'${c}'`).join(', ');
        const sql = `SELECT users.id,
                    COUNT(tag),
                    users.firstName,
                    TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
                    pictures.picture_1
                    from users
                    INNER JOIN tags ON tags.user_id=users.id
                    INNER JOIN tag_content ON tag_content.id=tags.tag_id
                    INNER JOIN pictures ON pictures.user_id=users.id
                    WHERE tag_content.tag IN (${injectedString})
                    GROUP BY users.id, pictures.picture_1, users.firstName
                    HAVING age BETWEEN ${filters.minAge} AND ${filters.maxAge}
                    AND COUNT(tag) > 0 AND users.id !='${userId}'
                    ORDER BY COUNT(tag)  DESC
                    LIMIT 0, 5
            `;
        const [result, fields] = await connection
            .promise()
            .query(sql);
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
        const sql = `UPDATE users SET ? WHERE id = '${id}'`;
        const info = {
            username: data.username,
            email: data.email,
            password: data.password,
            biography: data.biography,
            gender: data.gender,
            interessted: data.interessted,
            firstName: data.firstName,
            lastName: data.lastName,
            minAge: data.minAge,
            maxAge: data.maxAge,
            maxDistance: data.maxDistance,
            refreshToken: data.refreshToken,
            verified: data.verified,
            job: data.job,
        }
        const [result, filed] = await connection.promise().query(sql, info);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM users WHERE id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }


}

module.exports = new User();