var express = require('express');
const createDb = require('./createDB/createdb.controller');


var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./users/user.router'));

const start = async() => {
    createDb();
    await app.listen(PORT, () => {
        console.log("server start !!")
    });
}

module.exports = start;