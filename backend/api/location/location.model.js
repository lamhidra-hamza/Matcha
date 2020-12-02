var connection = require('../../utils/db');
var uuid = require('uuid');

class Location {

    async create(userId, data) {
        let info = {
            user_id: userId,
            longitude: data.longitude,
            latitude: data.latitude,
        };
        await connection.promise().query("INSERT INTO location SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection.promise().query(`SELECT * FROM location where user_id ='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM location WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE location SET 
            longitude='${data.longitude}', latitude='${data.latitude}'
            WHERE id = '${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM location WHERE id = '${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Location;