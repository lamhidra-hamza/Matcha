var express = require("express");
var router = express.Router();
var {
  uploadImage,
  getMany,
  getOne,
  createOne,
  updateOne,
  removeOne,
  uploadImage,
} = require("./pictures.controller");
var multer = require("multer");
const path = require("path");
const verify = require("../../utils/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.use(verify);

router
  .route("/")
  .get(getMany)
  .post(upload.array("image", 5), uploadImage, createOne);

router
  .route("/:id")
  .get(getOne)
  .put(updateOne)
  .delete(removeOne);

module.exports = router;
