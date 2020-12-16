const jwt = require("jsonwebtoken");

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
}

async function auth(req, res, next) {
    // console.log(req)
    console.log(req.headers['token'])
    let accessToken = req.body.token;
    if (!accessToken)
        accessToken = req.query.token;
    if (!accessToken)
        accessToken = req.headers['token'];
    req.status = 1;
    if (!accessToken) {
        req.status = -1;
    }
    try {
        const result = await jwt.verify(accessToken, "matcha-secret-code");
        console.log("id == ", result.id);
        req.user.id = result.id;
    } catch (err) {
        let errorMessage = -1;
        if (err.expiredAt)
            errorMessage = 0;
        req.status = errorMessage;
        console.log("eee")
    }
    next();
}

module.exports = auth;