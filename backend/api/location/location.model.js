var connection = require("../../utils/db");
var uuid = require("uuid");
var SqlString = require('sqlstring');


class Location {
    async create(userId, data) {
        let info = {
            user_id: data.user_id,
            longitude: data.longitude,
            latitude: data.latitude,
        };
        await connection.promise().query(SqlString.format('INSERT INTO location SET ?', info));
    }

    async findall(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM location where user_id =${SqlString.escape(userId)}`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM location WHERE user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, data) {
        const sql = `UPDATE location SET 
            longitude=${SqlString.escape(data.longitude)},
            latitude=${SqlString.escape(data.latitude)},
            location_name=${SqlString.escape(data.location_name)},
            real_location=${SqlString.escape(data.real_location)}
            where user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM location WHERE id = ${SqlString.escape(id)} AND user_id=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Location();