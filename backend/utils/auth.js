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
    console.log("the auth function");
    // if (!accessToken)
    //     accessToken = req.query.token;
    // if (!accessToken)
    let accessToken = req.headers['token'];
    let id = req.headers['id'];
    console.log("the access token is");
    console.log(accessToken);
    console.log("the user id is");
    console.log(id);
    req.status = 1;
    if (!accessToken) {
        req.status = -1;
    }
    try {
        const result = await jwt.verify(accessToken, "matcha-secret-code");
        console.log("id ====================================> ", result.id);
        req.id = result.id;
        if (req.id != id)
            req.status = -1;
        console.log("the user is");
        console.log(id);
    } catch (err) {
        let errorMessage = -1;
        if (err.expiredAt)
            errorMessage = 0;
        req.status = errorMessage;
        console.log(err);
        console.log("the error of the token is ==============>");
    }
    next();
}

module.exports = auth;