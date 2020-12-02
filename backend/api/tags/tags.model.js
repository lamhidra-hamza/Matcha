var connection = require("../../utils/db");
var uuid = require("uuid");

class Tags {
    async findTagId(tag) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM tags WHERE tag='${tag}'`);
        if (result[0]) return result[0].id;
        else {
            await connection.promise().query(`INSERT INTO tags SET ?`, {
                tag: tag,
            });
            const [result, fields] = await connection
                .promise()
                .query(`SELECT * FROM tags WHERE tag='${tag}'`);
            if (result[0]) return result[0].id;
        }
        return 1;
    }

    async create(userId, data) {
        await this.findTagId(data.tag);
        let info = {
            user_id: userId,
            tag_id: await this.findTagId(data.tag),
        };
        await connection.promise().query("INSERT INTO user_tag SET ?", info);
    }

    async findall(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT tag FROM user_tag INNER JOIN tags ON user_tag.tag_id=tags.id WHERE user_id='${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM user_tag WHERE user_id='${userId}' AND id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        // const sql = `UPDATE notifications SET
        //     longitude='${data.longitude}', latitude='${data.latitude}'
        //     WHERE id = '${id}' AND user_id='${userId}'`;
        // const [result, filed] = await connection.promise().query(sql);
        // return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM user_tag WHERE id='${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Tags();