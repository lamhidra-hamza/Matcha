var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "192.168.99.101",
    user: "root",
    password: "hamza123",
    database: "matcha"
});

module.exports = connection;