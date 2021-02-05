var connection = require('../../utils/db');
const SqlString = require('sqlstring');
const { HTTP500Error } = require("../../utils/errorHandler");


class Block {

    async create(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: userId,
                    blocked_user: data.blocked_user,
                };
                await connection.promise().query(SqlString.format('INSERT INTO block SET ?', info));
                resolve("done");
            } catch {
                reject(new HTTP500Error('internal Error DB'));
            }
        })

    }

}

module.exports = new Block;