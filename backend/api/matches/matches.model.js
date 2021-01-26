var connection = require('../../utils/db');
var SqlString = require('sqlstring');


class Matches {

    async create(userId, data) {
        console.log(data);
        let info = {
            user_id: userId,
            matched_user: data.matched_user,
            date: new Date().toISOString().slice(0, 19).replace("T", " ")
        };
        await connection.promise().query(SqlString.format('INSERT INTO matches SET ?', info));
    }

    async findAllInfo(chatId, userId) {
        let [result, fields] = await connection.promise().query(`SELECT user_id, receiver_id from chat where chat_id = ${SqlString.escape(chatId)}`);
        console.log("the result of find all infos is", result[0].receiver_id);
        let matchedUser;
        let lastResult = {};
        if (result[0].receiver_id == userId)
            matchedUser = result[0].user_id;
        else
            matchedUser = result[0].receiver_id;
        console.log("the userId is ", userId, "and the matched user is ", matchedUser);
        [result, fields] = await connection.promise().query(`SELECT date from matches where ((user_id = ${SqlString.escape(matchedUser)} and matched_user = ${SqlString.escape(userId)}) OR  (user_id = ${SqlString.escape(userId)} and matched_user = ${SqlString.escape(matchedUser)}))`);
        console.log("the date of matched are \n\n", result);
        lastResult['date'] = result[0].date;
        [result, fields] = await connection.promise().query(`SELECT users.username, users.firstName, users.job, users.biography, users.bornDate, pictures.picture_1, pictures.picture_2, pictures.picture_3, pictures.picture_4, pictures.picture_5, location.longitude, location.latitude 
        from users, pictures, location 
        WHERE users.id = pictures.user_id and users.id = location.user_id
        and users.id = ${SqlString.escape(matchedUser)}`);

        lastResult = {...lastResult, ...result[0]};
        return lastResult;
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
            AND (matches.user_id = ${SqlString.escape(userId)} OR matched_user=${SqlString.escape(userId)})
            AND pictures.user_id=users.id AND users.id != ${SqlString.escape(userId)}
            AND ((users.id=chat.receiver_id AND chat.user_id =${SqlString.escape(userId)} ) OR (
                users.id=chat.user_id AND chat.receiver_id=${SqlString.escape(userId)}))
            GROUP BY users.id,  pictures.picture_1, age, users.firstName, chat.chat_id
            LIMIT ${limit}, ${params.numberOfItem}
            `

        console.log(sql)
        const [result, fields] = await connection.promise().query(sql);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM matches WHERE user_id=${SqlString.escape(userId)} AND id=${id}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE matches SET matched_user=${SqlString.escape(data.matched_user)}
            WHERE id = ${id} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM matches WHERE id=${id} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Matches;