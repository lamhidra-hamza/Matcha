var mysql = require('mysql2');

var connection = mysql.createPool({
    host: "192.168.99.104",
    user: "root",
    password: "root",
    database: "matcha"
});

module.exports = connection;