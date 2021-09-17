var mysql = require('mysql2');

var connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123",
    database: "matcha",
    port: 3307
});

module.exports = connection;