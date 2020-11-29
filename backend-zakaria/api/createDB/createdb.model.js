const {
    db
} = require('../../config/database');

function createDB(table, callback) {
    db.connect(function(err) {
        if (err)
            return 0;
        console.log("Connected!");

    });


    db.query(table.sql, (err, result) => {
        if (err) {
            console.log("\x1b[41m", `====>${table.failMessage}`);
            return callback(err, null);
        } else {
            console.log(table.successMessage);
            console.log("\x1b[32m", ` ====>${table.successMessage}`);
            return callback(null, result);
        }
    });

}

module.exports = {
    create: createDB
}