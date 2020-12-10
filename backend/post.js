const router = require("express").Router();
const verify = require("./utils/auth");

router.post("/", verify, (req, res) => {
  console.log(`post function route : the status is ${req.status}`);
  if (req.status === -1 || req.status === 0) {
    res
      .status(200)
      .send({ status: req.status, message: "you dont have the right to acces to this route" });
    res.end();
  } else
    res.send({
      status: 1,
      name: "zakaria",
    });
});

module.exports = router;
