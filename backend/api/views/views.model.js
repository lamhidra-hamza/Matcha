var connection = require('../../utils/db');
const { HTTP500Error } = require("../../utils/errorHandler");
const SqlString = require('sqlstring');


class Views {

    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    viewed_user: data.viewed_user,
                };
                const result = await connection
                    .promise()
                    .query(SqlString.format('INSERT INTO views SET ?', info));
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('Internal Server Error'));
            }
        })

    }
}

module.exports = new Views;