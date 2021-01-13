var connection = require("../../utils/db");
var uuid = require("uuid");

class Chat {
  async create(userId, data) {
    console.log(`create function is `, data);
    let info = {
      sender_id: userId,
      chat_id: data.chat_id,
      content: data.content,
      date: Date.now(),
      seen: 0,
    };
    console.log("the info are", info);
    const [result, filed] = await connection
      .promise()
      .query("INSERT INTO messages SET ?", info);

    await connection
      .promise()
      .query(
        `UPDATE chat SET date = ${info.date} WHERE chat_id = '${data.chat_id}'`);

    return result.insertId;
  }

  async createChat(userId, data) {
    let info = {
      user_id: userId,
      receiver_id: data.receiver_id,
      chat_id: uuid.v4(),
      date: null,
    };
    await connection.promise().query("INSERT INTO chat SET ?", info);
  }

  //find last conversations for the user
  async findall(userId, body) {
    console.log("findall function and the user is", userId, "and the data is", body);
    const [result, fields] = await connection
      .promise()
      .query(
        `SELECT chat.chat_id, chat.user_id, chat.receiver_id, messages.date, messages.content, messages.seen FROM chat,messages,users where messages.chat_id = chat.chat_id and chat.receiver_id = "${userId}" OR chat.user_id = "${userId}" and  messages.id in (SELECT MAX(id) FROM messages GROUP by chat_id) LIMIT ${body.startIndex},${body.length}`
      );
    return result;
  }

  //find last conversations for the user
  async findOne(msgId) {
    console.log("the findONe function and the msgId is ", msgId);
    const sql = `SELECT * FROM messages WHERE id= ${msgId}`;
    const [result, fields] = await connection.promise().query(sql);
    return result;
  }

  //find the last messages in this conversation
  async findLast(chat_id, index, length) {
    const sql = `SELECT * FROM messages WHERE chat_id = '${chat_id}' ORDER BY date DESC LIMIT ${index}, ${length}`;
    const [result, filed] = await connection.promise().query(sql);
    return result;
  }

  async findChatById(chatId) {
    const sql = `SELECT * FROM chat WHERE chat_id='${chatId}'`;
    const [result, filed] = await connection.promise().query(sql);
    return result;
  }

  async findOneAndUpdate(userId, id, data) {
    // const sql = `UPDATE chat SET
    //     viewed_user='${data.viewed_user}'
    //     WHERE id = '${id}' AND user='${userId}'`;
    // const [result, filed] = await connection.promise().query(sql);
    // return result;
  }

  async findOneAndRemove(userId, id) {
    const sql = `DELETE FROM chat WHERE id = '${id}' AND user_id='${userId}'`;
    const [result, filed] = await connection.promise().query(sql);
    return result;
  }
}

module.exports = new Chat();
