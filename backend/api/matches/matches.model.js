var connection = require('../../utils/db');
var SqlString = require('sqlstring');
const { HTTP500Error } = require("../../utils/errorHandler");


class Matches {

    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    matched_user: data.matched_user,
                    date: new Date().toISOString().slice(0, 19).replace("T", " ")
                };
                await connection.promise().query(SqlString.format('INSERT INTO matches SET ?', info));
                resolve("Done");
            } catch (err) {
                reject(new HTTP500Error('internal error db'));
            }
        })
    }

    async findAllInfo(chatId, userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                let [result, fields] = await connection
                    .promise()
                    .query(`SELECT user_id, receiver_id from chat where chat_id = ${SqlString.escape(chatId)}`);
                let matchedUser;
                let lastResult = {};
                if (result[0].receiver_id == userId)
                    matchedUser = result[0].user_id;
                else
                    matchedUser = result[0].receiver_id;
                [result, fields] = await connection
                    .promise()
                    .query(`SELECT date from matches where ((user_id = ${SqlString.escape(matchedUser)} and matched_user = ${SqlString.escape(userId)}) OR  (user_id = ${SqlString.escape(userId)} and matched_user = ${SqlString.escape(matchedUser)}))`);
                lastResult['date'] = result[0].date;
                [result, fields] = await connection
                    .promise()
                    .query(`SELECT
                                users.username,
                                users.firstName,
                                users.job,
                                users.biography,
                                users.bornDate,
                                pictures.picture_1,
                                pictures.picture_2,
                                pictures.picture_3,
                                pictures.picture_4,
                                pictures.picture_5,
                                location.longitude,
                                location.latitude 
                            from users, pictures, location 
                            WHERE users.id = pictures.user_id and users.id = location.user_id
                            and users.id = ${SqlString.escape(matchedUser)}`);
                lastResult = {...lastResult, ...result[0] };
                resolve(lastResult);
            } catch (err) {
                reject(new HTTP500Error('internal error db'));
            }
        })
    }

    async findall(userId, params) {
        return await new Promise(async(resolve, reject) => {
            try {
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
                const [result, fields] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error db'));
            }
        })
    }
}

module.exports = new Matches;