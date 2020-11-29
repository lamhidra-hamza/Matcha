const { create } = require('./createdb.model');

const usersTable = {
    sql: `CREATE TABLE users(id VARCHAR(255) PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), refreshToken VARCHAR(255), lastConnection DATETIME, lastNotification DATETIME, gender VARCHAR(255), interessted VARCHAR(255), biography VARCHAR(255))`,
    successMessage: "the USER Table has been created",
    failMessage: "the USER Table hasn't been created"
};

const likesTable = {
    sql: `CREATE TABLE likes(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), liked_user VARCHAR(255), date DATETIME, FOREIGN KEY (user_id) REFERENCES users(id),  FOREIGN KEY (liked_user) REFERENCES users(id))`,
    successMessage: "the LIKES Table has been created",
    failMessage: "the user Table hasn't been created"
};

const picturesTable = {
    sql: `
    CREATE TABLE pictures(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), picture_1 VARCHAR(255), picture_2 VARCHAR(255), picture_3 VARCHAR(255), picture_4 VARCHAR(255), picture_5 VARCHAR(255), defaultPic INT(1), FOREIGN KEY(user_id) REFERENCES users(id))
    `,
    successMessage: "the PICTURES Table has been created",
    failMessage: "the PICTURES table hasn't been created"
};

const blockTable = {
    sql: `
    CREATE TABLE block(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), blocked_user VARCHAR(255), FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(blocked_user) REFERENCES users(id))        `,
    successMessage: "the BLOCK Table has been created",
    failMessage: "the BLOCK Table hasn't been created"
};

const viewsTable = {
    sql: `
        CREATE TABLE views(id integer AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), viewed_user VARCHAR(255), FOREIGN KEY(user) REFERENCES users(id), FOREIGN KEY(viewed_user) REFERENCES users(id))
        `,
    successMessage: "the VIEWS Table has been created",
    failMessage: "the VIEWS Table hasn't been created"
};

const chatTable = {
    sql: `
    CREATE TABLE chat(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), receiver_id VARCHAR(255), chat_id VARCHAR(255), date DATETIME, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (receiver_id) REFERENCES users(id))        `,
    successMessage: "the CHAT Table has been created",
    failMessage: "the CHAT Table hasn't been created"
};

const messagesTable = {
    sql: `
    CREATE TABLE messages(id INT AUTO_INCREMENT PRIMARY KEY, chat_id INT, content TEXT, sender_id VARCHAR(255), date DATETIME, seen BOOLEAN, FOREIGN KEY (chat_id) REFERENCES chat(id))        `,
    successMessage: "the MESSAGE Table has been created",
    failMessage: "the MESSAGE Table hasn't been created"
};

const locationTable = {
    sql: `
    CREATE TABLE location(id INT AUTO_INCREMENT PRIMARY KEY, longitude FLOAT, latitude FLOAT, user_id VARCHAR(255), FOREIGN KEY (user_id) REFERENCES users(id))        `,
    successMessage: "the LOCATION Table has been created",
    failMessage: "the LOCATION Table hasn't been created"
};

const notificationsTable = {
    sql: `
    CREATE TABLE notifications(id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50), date DATETIME, user_id VARCHAR(255), FOREIGN KEY (user_id) REFERENCES users(id))        `,
    successMessage: "the NOTIFICATIONS Table has been created",
    failMessage: "the NOTIFICATIONS Table hasn't been created"
};

const tagsTable = {
    sql: `
    CREATE TABLE tags(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), tag VARCHAR(255), FOREIGN KEY (user_id) REFERENCES users(id))        `,
    successMessage: "the TAGS Table has been created",
    failMessage: "the TAGS Table hasn't been created"
};

const tableList = [usersTable, likesTable, picturesTable, blockTable, viewsTable, chatTable, messagesTable, locationTable, notificationsTable, tagsTable];

const createDB = (req, res) => {
    tableList.map(table => {
        create(table, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database error please handle your shit"
                });
            }
        });
    });
    return res.status(200).json({
        success: 1,
        message: "the user is created man"
    });
}

module.exports = {
    createDB: createDB
};