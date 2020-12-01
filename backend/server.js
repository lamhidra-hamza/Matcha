var express = require('express');
const createDb = require('./createDB/createdb.controller');
const path = require('path');


var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./api/users/user.router'));
app.use('/posts', require('./post'));
app.use('/api/block', require('./api/block/block.router'));
app.use('/api/views', require('./api/views/views.router'));
app.use('/api/likes', require('./api/likes/likes.router'));
app.use('/api/pictures', require('./api/pictures/pictures.router'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const start = async() => {
    createDb();
    await app.listen(PORT, () => {
        console.log("server start !!")
    });
}

module.exports = start;