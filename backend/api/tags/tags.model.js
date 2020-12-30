var connection = require("../../utils/db");
var uuid = require("uuid");

class Tags {
    async findTagId(tag) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM tag_content WHERE tag='${tag}'`);
        if (result[0]) return result[0].id;
        else {
            await connection.promise().query(`INSERT INTO tag_content SET ?`, {
                tag: tag,
            });
            const [result, fields] = await connection
                .promise()
                .query(`SELECT * FROM tag_content WHERE tag='${tag}'`);
            if (result[0]) return result[0].id;
        }
        return 1;
    }

    async create(userId, tag) {
        await this.findTagId(tag);
        let info = {
            user_id: userId,
            tag_id: await this.findTagId(tag),
        };
        await connection.promise().query("INSERT INTO tags SET ?", info);
    }

    async findallTagArr(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT tag FROM tags INNER JOIN tag_content ON tags.tag_id=tag_content.id WHERE user_id='${userId}'`);
        return result;
    }

    async findall(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT tag, tags.id FROM tags INNER JOIN tag_content ON tags.tag_id=tag_content.id WHERE user_id='${userId}'`);
        return result;
    }

    async AllTags() {
        const sql = `SELECT * FROM tag_content`;
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
        const sql = `DELETE FROM tags WHERE id='${id}' AND user_id='${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new Tags();