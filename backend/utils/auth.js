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
  if (!accessToken)
    return res.status(200).send({
      status: 0,
      message:
        "please log in you dont have neither the acces token or the refresh token",
    });
  jwt.verify(accessToken, "matcha-secret-code", function (err, decoded) {
    if (err) {
      ///1 Verify the refresh Token
      //   jwt.verify(refreshToken, "matcha-secret-code", function (err, decoded) {
      //     if (err) {
      //         res
      //           .status(200)
      //           .send({ status: 0, message: "please login refresh token is invalid" });
      //     }
      //     const result = await model.findOne(null, body.email);
      //     if (result[0].refreshToken === refreshToken)

      //     console.log(decoded);
      //     console.log(decoded.id);
      //     next();
      //   });
      let errorMessage = -1;
      if (err.expiredAt)
        errorMessage = 0;
     res
        .status(200)
        .send({ status: errorMessage, message: "please login refresh token is invalid" });
      //1 - END
    }
    console.log(timeConverter( decoded.exp));
    next();
  });
}

module.exports = auth;
