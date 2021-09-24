var connection = require("../../utils/db");
var SqlString = require('sqlstring');
const { HTTP500Error } = require("../../utils/errorHandler");


class Location {
    async create(data) {
        return await new Promise(async(resolve, reject) => {
            try {
                let info = {
                    user_id: data.user_id,
                    longitude: null,
                    latitude: null,
                    real_location: 1
                };
                await connection.promise().query(SqlString.format('INSERT INTO location SET ?', info));
                resolve("Done")
            } catch (err) {
                reject(new HTTP500Error('internal error DB'));
            }
        })
    }

    async findOne(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM location WHERE user_id=${SqlString.escape(userId)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error DB'));
            }
        })
    }

    async findOneAndUpdate(userId, data) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `UPDATE location SET 
                    longitude=${SqlString.escape(data.longitude)},
                    latitude=${SqlString.escape(data.latitude)},
                    location_name=${SqlString.escape(data.location_name)},
                    real_location=${SqlString.escape(data.real_location)}
                    where user_id=${SqlString.escape(userId)}`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error DB'));
            }
        })
    }
}

module.exports = new Location();