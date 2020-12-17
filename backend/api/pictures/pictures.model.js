var connection = require('../../utils/db');
var uuid = require('uuid');

class Pictures {
    async create(userId, data) { 
        console.log("the data is ==>");
        console.log(data);
        let info = {
            user_id: userId,
            picture_1: data[0] ? data[0].path : null,
            picture_2: data[1] ? data[1].path : null,
            picture_3: data[2] ? data[2].path : null,
            picture_4: data[3] ? data[3].path : null,
            picture_5: data[4] ? data[4].path : null
        };
        await connection.promise().query("INSERT INTO pictures SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM pictures where user_id ='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM pictures WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        // const sql = `UPDATE pictures SET 
        //     viewed_user='${data.viewed_user}'
        //     WHERE id = '${id}' AND user='${userId}'`;
        // const [result, filed] = await connection.promise().query(sql);
        // return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM pictures WHERE id = '${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Pictures;