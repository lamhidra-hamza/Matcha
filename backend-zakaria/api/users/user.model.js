const {
    db
} = require('../../config/database');
const { v4 } = require('uuid');


async function createUser(data, callback) {
    db.connect(function(err) {
        if (err)
            return 0;
        console.log("Connected!");

    });
    const userID = v4();
    const sql_create_location = `INSERT INTO location(longitude, latitude, user_id ) VALUES('88.453', '34', '${userID}')`;
    const sql_create_user = `INSERT INTO users(id, username, email, password, location, lastConnection, lastNotification ) VALUES('${userID}', '${data.username}', '${data.email}', '${data.password}', '${data.location}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`;
    

    await db.query(sql_create_user, (err, result) => {
        if (err)
            return callback(err, null);
        else {
            console.log("=============================");
            console.log(result);
        }
    });

    await db.query(sql_create_location, (err, result) => {
        if (err)
            return callback(err, null);
        else {
            console.log("=============================");
            console.log("the location id is ");
            console.log(result);
        }
    });
    callback(null, userID);
}

module.exports = {
    create: createUser
}