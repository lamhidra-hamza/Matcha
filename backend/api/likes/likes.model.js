var connection = require("../../utils/db");
var SqlString = require("sqlstring");
const { HTTP500Error } = require("../../utils/errorHandler");

class Likes {
  async create(userId, data) {
    return await new Promise(async (resolve, reject) => {
      try {
        let info = {
          user_id: userId,
          liked_user: data.liked_user,
          date: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
        await connection
          .promise()
          .query(SqlString.format("INSERT INTO likes SET ?", info));
        await connection
          .promise()
          .query(`UPDATE users SET frameRate = frameRate + 1 WHERE id = ${SqlString.escape(data.liked_user)}`);
        await connection
          .promise()
          .query(`DELETE FROM views WHERE user_id = ${SqlString.escape(userId)} and viewed_user = ${SqlString.escape(data.liked_user)}`);
        resolve("done");
      } catch (err) {
        reject(new HTTP500Error("Internal Server Error"));
      }
    });
  }

  async findOne(userId, id) {
    return await new Promise(async (resolve, reject) => {
      try {
        const sql = `SELECT * FROM likes
                    where liked_user=${SqlString.escape(userId)}`;
        const [result, filed] = await connection.promise().query(sql);
        resolve(result);
      } catch (err) {
        reject(new HTTP500Error("Internal Server Error"));
      }
    });
  }
}

module.exports = new Likes();
