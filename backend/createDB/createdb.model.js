const db = require('../utils/db');

function createDB(table, callback) {

    db.query(table.sql, (err, result) => {
        if (err) {
            console.log(`====>${table.failMessage}`);
            return callback(err, null);
        } else {
            console.log(table.successMessage);
            console.log(` ====>${table.successMessage}`);
            return callback(null, result);
        }
    });

}

module.exports = {
    create: createDB
}