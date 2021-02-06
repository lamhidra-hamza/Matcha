const db = require('../utils/db');

async function createDB(table, callback) {
    try {
        const result = await db.promise().query(table.sql);

        return callback(null, result);
    } catch (err) {
        return callback(err, null);
    }
}

module.exports = {
    create: createDB
}