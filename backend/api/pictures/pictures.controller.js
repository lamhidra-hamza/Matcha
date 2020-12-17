const controllers = require("../../utils/crud");
const model = require("./pictures.model");

const uploadImage = (req, res, next) => {
  try {
    req.body = req.files;
    next();
  } catch (err) {
    console.log(err);
  }
};

async function getMany(req, res) {
  try {
    const data = await model.findall(req.user.id);
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).end({
      msg: `Error UserID = ${req.user.id} Does not exists`,
    });
  }
}

async function getOne(req, res) {
  try {
    const data = await model.findOne(req.user.id, req.params.id);
    if (!data) {
      res.status(400).end();
    }
    res.status(200).json({
      user: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(400).end({
      msg: `Error in getOne`,
    });
  }
}

async function createOne(req, res) {
  console.log("create one pictures=========== ===================================");
  try {
    if (req.status === 0 || req.status === -1){
        console.log(`the req.status is ${req.status}`);
        res
          .status(200)
          .send({ status: req.status, message: "token is invalid or expired" });
    }    
    else {
      await model.create(req.id, req.body);
      res.status(201).send({
        msg: "create Done!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).end({
      msg: `Error in createOne`,
    });
  }
}

async function updateOne(req, res) {
  try {
    await model.findOneAndUpdate(req.id, req.id, req.body);
    res.status(201).send({
      msg: "Update Done!!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).end({
      msg: `Error in updateOne`,
    });
  }
}

async function removeOne(req, res) {
  try {
    await model.findOneAndRemove(req.user.id, req.params.id);
    res.status(201).send({
      msg: "Remove Done!!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).end({
      msg: `Error in removeOne`,
    });
  }
}

const controller = controllers(model);
module.exports = {
  uploadImage: uploadImage,
  getMany: getMany,
  getOne: getOne,
  createOne: createOne,
  updateOne: updateOne,
  removeOne: removeOne,
};