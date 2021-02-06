var express = require("express");
const createDb = require("./createDB/createdb.controller");
const cookieParser = require("cookie-parser");
const path = require("path");
var cors = require("cors");
var app = express();
const { errorHandler } = require('./utils/errorHandler')

var PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./api/users/user.router"));
app.use("/api/firstcheck", require("./api/firstcheck/firstcheck.router"));
app.use("/posts", require("./post"));
app.use("/api/block", require("./api/block/block.router"));
app.use("/api/views", require("./api/views/views.router"));
app.use("/api/likes", require("./api/likes/likes.router"));
app.use("/api/pictures", require("./api/pictures/pictures.router"));
app.use("/api/chat", require("./api/chat/chat.router"));
app.use("/api/location", require("./api/location/location.router"));
app.use("/api/matches", require("./api/matches/matches.router"));
app.use(
    "/api/notifications",
    require("./api/notifications/notifications.router")
);
app.use("/api/tags", require("./api/tags/tags.router"));
app.use("/confirmation/:id", require("./utils/emailConfirm"));

app.use(async(err, req, res, next) => {
    if (!errorHandler.isTrustedError(err)) {

        // next(err);
        res.status(500).send({ msg: "errro" })

    }
    await errorHandler.handleError(err, res);
});

const start = async() => {
    createDb();
    app.listen(PORT, () => {
        console.log("server start !!");
    });
};

module.exports = start;