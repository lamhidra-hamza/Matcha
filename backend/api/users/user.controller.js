const controllers = require("../../utils/crud");
const model = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serInfo = require("../../config/index");
const serverInfo = require("../../config/index");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: serInfo.user,
    pass: serInfo.pass,
  },
});

async function signIn(req, res) {
  console.log("\nSignin Function");
  const body = req.body;
  const result = await model.findOne(null, body.email);
  if (!result[0] || !body.password || !body.email) {
    res.status(403).send({ status: 0, message: "you dont have an account" });
  } else {
    console.log(body.password);
    body.password = await bcrypt.hash(body.password, 11);
    console.log(body.password);
    console.log(result[0].password);
    if (bcrypt.compare(result[0].password, body.password)) {
      const access_token = await jwt.sign(
        { id: result[0].id, type: "access-token" },
        "matcha-secret-code",
        { expiresIn: "20s" }
      );
      const refresh_token = await jwt.sign(
        {
          id: result[0].id,
          type: "refresh-token",
        },
        "matcha-secret-code",
        { expiresIn: "10d" }
      );
      model.updateRefreshToken(result[0].id, refresh_token);
      res
        .cookie("authcookie", refresh_token, { httpOnly: true })
        .send({ status: 1, message: "logged", accessToken: access_token });
    } else
      res.status(403).send({ status: 0, message: "the password if incorrect" });
  }
}

async function getToken(req, res) {
  const refreshToken = req.cookies.authcookie;
  jwt.verify(refreshToken, "matcha-secret-code", async function (err, decoded) {
    if (err) {
      res
        .status(200)
        .send({ status: 0, message: "please login refresh token is invalid" });
    }
    const result = await model.findOneById(decoded.id);
    if (result[0].refreshToken !== refreshToken)
      res.send({ status: 0, message: "your refresh token is invalid" });
    const access_token = await jwt.sign(
      { id: result[0].id, type: "access-token" },
      "matcha-secret-code",
      { expiresIn: "0.3h" }
    );
    res.send({
      status: 1,
      message: "new access token",
      accessToken: access_token,
    });
  });
}

async function signUp(req, res) {
  const body = req.body;
  console.log(body);
  const result = await model.create(body);
  const token = jwt.sign(
    { id: result.id, username: result.username },
    "matcha-secret-code",
    {
      expiresIn: "1d",
    },
    (err, emailToken) => {
      const url = `${serInfo.HOST}:${serverInfo.PORT}/confirmation/${emailToken}`;
      console.log(`${body.email}`);

      let info = transporter.sendMail({
        to: `${body.email}`, // list of receivers
        subject: "[MATCHA] Email Confirmation", // Subject line
        html: `<br>Please click on the link bellow to confirm your email Adress: </br><br><a href='${url}'>${url}</a></br>`, // html body
      });

      console.log("Message sent");
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
  );

  res
    .cookie("authcookie", token, {
      maxAge: 900000,
      httpOnly: true,
    })
    .send(result);
}

async function signOut(req, res) {
  res.cookie("authcookie", "").send({ status: 1, message: "loggedout" });
}

module.exports = {
  signIn: signIn,
  controllers: controllers(model),
  signUp: signUp,
  signOut: signOut,
  getToken: getToken,
};
