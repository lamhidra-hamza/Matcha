const controllers = require("../../utils/crud");
const model = require("./firstcheck.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function checkuser(req, res) {
  const token = req.cookies.authcookie;

  if (!token)
    return res.status(200).json({
      success: 0,
    });
  try {
    const verified = await jwt.verify(token, "matcha-secret-code");
    req.user = verified;
    res.status(200).json({
      success: 1,
      user: verified.id,
      status: "logged",
      redirectUrl: "/app",
    });
  } catch (err) {
  }
}

module.exports = {
  checkuser: checkuser,
};
