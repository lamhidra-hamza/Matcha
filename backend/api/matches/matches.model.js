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

    async findall(userId, params) {
        const limit = params.numberOfItem * params.page;

        const sql = `SELECT users.id,
            users.firstName,
            TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
            pictures.picture_1,
            chat.chat_id
            FROM matches, users, pictures, chat 
            WHERE (users.id=matched_user OR users.id = matches.user_id)
            AND (matches.user_id = '${userId}' OR matched_user='${userId}')
            AND pictures.user_id=users.id AND users.id != '${userId}'
            AND ((users.id=chat.receiver_id AND chat.user_id ='${userId}' ) OR (
                users.id=chat.user_id AND chat.receiver_id='${userId}'))
            GROUP BY users.id,  pictures.picture_1, age, users.firstName, chat.chat_id
            LIMIT ${limit}, ${params.numberOfItem}
            `

        console.log(sql)
        const [result, fields] = await connection.promise().query(sql);
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