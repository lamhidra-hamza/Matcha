const controllers = require("../../utils/crud");
const model = require("./user.model");
const bcrypt = require('bcrypt');

async function signIn(req, res) {
  console.log("\nSignin Function");
  const body = req.body;
  const result = await model.findOne("0", body.email);
  if (!result) {
    res.status(403).send({ status: 0, message: "you dont have an account" });
  } else {
    console.log(body.password);
    body.password = await bcrypt.hash(body.password, 11);
    console.log(body.password);
    console.log(result[0].password);
    if (bcrypt.compare(result[0].password, body.password))
      res.status(201).send({ status: 1, message: "logged" });
    else
    res.status(403).send({ status: 0, message: "the password if incorrect" });
  }
}

module.exports = {
  signIn: signIn,
  controllers: controllers(model),
};
