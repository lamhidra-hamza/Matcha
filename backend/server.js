var express = require('express');
var logger = require('./midelwares/logger');
var connection = require('./utils/db');

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use('/api/members', require('./routes/api/members'));
app.use('/api/users', require('./users/user.router'));

const start = async() => {
    connection.query("CREATE DATABASE IF NOT EXISTS matcha", (err, result) => {
        if (err) throw err;
    })
    console.log("Connected!");
    await app.listen(PORT, () => {
        console.log("server start !!")
    });
}

module.exports = start;