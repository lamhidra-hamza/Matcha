var connection = require("../../utils/db");
const { HTTP500Error } = require("../../utils/errorHandler");

class Tags {
    async findTagId(tag) {
        return await new Promise(async(resolve, reject) => {
            try {
                const [result, fields] = await connection
                    .promise()
                    .query(`SELECT * FROM tag_content WHERE tag='${tag}'`);
                if (result[0]) resolve(result[0].id);
                else {
                    await connection.promise().query(`INSERT INTO tag_content SET ?`, {
                        tag: tag,
                    });
                    const [result, fields] = await connection
                        .promise()
                        .query(`SELECT * FROM tag_content WHERE tag='${tag}'`);
                    if (result[0]) resolve(result[0].id);
                }
                resolve(1);
            } catch (err) {
                reject(new HTTP500Error('internal error db'));
            }
        })

    }

    async create(userId, tag) {
        return await new Promise(async(resolve, reject) => {
            try {
                await this.findTagId(tag);
                let info = {
                    user_id: userId,
                    tag_id: await this.findTagId(tag),
                };
                await connection.promise().query("INSERT INTO tags SET ?", info);
                resolve("done");
            } catch (err) {
                reject(new HTTP500Error('internal error db'));
            }
        })
    }

    async findallTagArr(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const [result, fields] = await connection
                    .promise()
                    .query(`SELECT tag FROM tags INNER JOIN tag_content ON tags.tag_id=tag_content.id WHERE user_id='${userId}'`);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error db'))
            }
        })

    }

    async findall(userId) {
        return await new Promise(async(resolve, reject) => {
            try {
                const [result, fields] = await connection
                    .promise()
                    .query(`SELECT tag, tags.id FROM tags INNER JOIN tag_content ON tags.tag_id=tag_content.id WHERE user_id='${userId}'`);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error db'))
            }
        })
    }

    async AllTags() {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `SELECT * FROM tag_content`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error db'))
            }
        })


    }

    async findOneAndRemove(userId, id) {
        return await new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM tags WHERE id='${id}' AND user_id='${userId}'`;
                const [result, filed] = await connection.promise().query(sql);
                resolve(result);
            } catch (err) {
                reject(new HTTP500Error('internal error db'))
            }
        })
    }
}

module.exports = new Tags();