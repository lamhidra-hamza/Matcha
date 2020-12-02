const db = require('../utils/db');

async function createDB(table, callback) {

    try {
        const [result, filed] = await db.promise().query(table.sql);
        console.log(table.successMessage);
        console.log(` ====>${table.successMessage}`);
        return callback(null, result);
    } catch (err) {
        console.log(`====>${table.failMessage}`);
        return callback(err, null);
    }
}

module.exports = {
    create: createDB
}