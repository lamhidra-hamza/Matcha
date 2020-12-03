var express = require('express');
const createDb = require('./createDB/createdb.controller');
const cookieParser = require('cookie-parser');
const path = require('path');


var app = express();
var PORT = process.env.PORT || 5000;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/users', require('./api/users/user.router'));
app.use('/posts', require('./post'));
app.use('/api/block', require('./api/block/block.router'));
app.use('/api/views', require('./api/views/views.router'));
app.use('/api/likes', require('./api/likes/likes.router'));
app.use('/api/pictures', require('./api/pictures/pictures.router'));
app.use('/api/chat', require('./api/chat/chat.router'));
app.use('/api/location', require('./api/location/location.router'));
app.use('/api/messages', require('./api/messages/messages.router'));
app.use('/api/notifications', require('./api/notifications/notifications.router'));
app.use('/api/tags', require('./api/tags/tags.router'));




const start = async() => {
    createDb();
    await app.listen(PORT, () => {
        console.log("server start !!")
    });
}

module.exports = start;