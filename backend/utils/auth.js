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

function auth(req, res, next) {
  const accessToken = req.body.token;
  req.status = 1;
  if (!accessToken){
    // res.status(200).send({
    //   status: -1,
    //   message:
    //     "please log in you dont have neither the acces token or the refresh token",
    // });
    req.status = -1;
  }

  jwt.verify(accessToken, "matcha-secret-code", function (err, decoded) {
    if (err) {
      let errorMessage = -1;
      if (err.expiredAt)
        errorMessage = 0;
    //  res.status(200).send({ status: errorMessage, message: "please login refresh token is invalid" });
    req.status = errorMessage;
      //1 - END
    }
    next();
  });
}

module.exports = auth;
