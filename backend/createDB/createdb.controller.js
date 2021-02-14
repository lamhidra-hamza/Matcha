const {
    create
} = require("./createdb.model");

const sql_mode = {
    sql: `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
    successMessage: "SET GLOBAL sql_mode successed",
    failMessage: "SET GLOBAL sql_mode failed",
}

const usersTable = {
    sql: `CREATE TABLE IF NOT EXISTS users(id VARCHAR(255) PRIMARY KEY, username VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255),
        email VARCHAR(255), password VARCHAR(255),job VARCHAR(255), refreshToken VARCHAR(255), lastConnection DATETIME, 
        lastNotification DATETIME, gender VARCHAR(255), interessted VARCHAR(255), biography VARCHAR(255), bornDate DATETIME, verified BOOLEAN, infoCompleted BOOLEAN, minAge INT, maxAge INT, maxDistance INT, frameRate INT)`,
    successMessage: "the USER Table has been created",
    failMessage: "the USER Table hasn't been created",
};

const likesTable = {
    sql: `CREATE TABLE IF NOT EXISTS likes(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
         liked_user VARCHAR(255), date DATETIME, FOREIGN KEY (user_id) REFERENCES users(id),  
         FOREIGN KEY (liked_user) REFERENCES users(id))`,
    successMessage: "the LIKES Table has been created",
    failMessage: "the user Table hasn't been created",
};

const picturesTable = {
    sql: `CREATE TABLE IF NOT EXISTS pictures(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
        picture_1 VARCHAR(255), picture_2 VARCHAR(255), picture_3 VARCHAR(255), picture_4 VARCHAR(255), 
        picture_5 VARCHAR(255), defaultPic INT(1), FOREIGN KEY(user_id) REFERENCES users(id))`,
    successMessage: "the PICTURES Table has been created",
    failMessage: "the PICTURES table hasn't been created",
};

const blockTable = {
    sql: `CREATE TABLE IF NOT EXISTS block(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
        blocked_user VARCHAR(255), FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(blocked_user)
        REFERENCES users(id))        `,
    successMessage: "the BLOCK Table has been created",
    failMessage: "the BLOCK Table hasn't been created",
};

const viewsTable = {
    sql: `CREATE TABLE IF NOT EXISTS views(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
        viewed_user VARCHAR(255), FOREIGN KEY(user_id) REFERENCES users(id), 
        FOREIGN KEY(viewed_user) REFERENCES users(id))`,
    successMessage: "the VIEWS Table has been created",
    failMessage: "the VIEWS Table hasn't been created",
};

const chatTable = {
    sql: `
        CREATE TABLE IF NOT EXISTS chat(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
        receiver_id VARCHAR(255), chat_id VARCHAR(255) UNIQUE, date DATETIME, FOREIGN KEY (user_id) REFERENCES
        users(id), FOREIGN KEY (receiver_id) REFERENCES users(id))        `,
    successMessage: "the CHAT Table has been created",
    failMessage: "the CHAT Table hasn't been created",
};

const messagesTable = {
    sql: `CREATE TABLE IF NOT EXISTS messages(id INT AUTO_INCREMENT PRIMARY KEY, chat_id VARCHAR(255), content TEXT,
        sender_id VARCHAR(255), date DATETIME, seen BOOLEAN, FOREIGN KEY (chat_id) REFERENCES chat(chat_id))       `,
    successMessage: "the MESSAGE Table has been created",
    failMessage: "the MESSAGE Table hasn't been created",
};

const locationTable = {
    sql: `CREATE TABLE IF NOT EXISTS location(id INT AUTO_INCREMENT PRIMARY KEY, longitude FLOAT, 
        latitude FLOAT, user_id VARCHAR(255), location_name VARCHAR(255), real_location BOOLEAN, FOREIGN KEY (user_id) REFERENCES users(id))        `,
    successMessage: "the LOCATION Table has been created",
    failMessage: "the LOCATION Table hasn't been created",
};

const notificationsTable = {
    sql: `
    CREATE TABLE IF NOT EXISTS notifications(id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50),
    date DATETIME, readed BOOLEAN, user_id VARCHAR(255), FOREIGN KEY (user_id) REFERENCES users(id))        `,
    successMessage: "the NOTIFICATIONS Table has been created",
    failMessage: "the NOTIFICATIONS Table hasn't been created",
};

const tagsTable = {
    sql: `
    CREATE TABLE IF NOT EXISTS tag_content(id INT AUTO_INCREMENT PRIMARY KEY, tag VARCHAR(255))`,
    successMessage: "the TAGS Table has been created",
    failMessage: "the TAGS Table hasn't been created",
};

const tags = {
    sql: `CREATE TABLE IF NOT EXISTS tags(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
        tag_id INT, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (tag_id) REFERENCES tag_content(id))`,
    successMessage: "the User_tag Table has been created",
    failMessage: "the User_tag Table hasn't been created",
};

const matches = {
    sql: `CREATE TABLE IF NOT EXISTS matches(id integer AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
    matched_user VARCHAR(255), date DATETIME, FOREIGN KEY (user_id) REFERENCES users(id),  
    FOREIGN KEY (matched_user) REFERENCES users(id))`,
    successMessage: "the matches Table has been created",
    failMessage: "the matches Table hasn't been created",
}

const tableList = [
    sql_mode,
    usersTable,
    likesTable,
    picturesTable,
    blockTable,
    viewsTable,
    chatTable,
    messagesTable,
    locationTable,
    notificationsTable,
    tagsTable,
    tags,
    matches
];

const createDB = async() => {
    for (let i = 0; i < tableList.length; i++) {
        await create(tableList[i], (err, results) => {
            if (err) {}
        });
    }
};

module.exports = createDB;