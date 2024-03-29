var express = require('express');
var router = express.Router();
var {
    getOne,
    createOne,
    updateOne,
    uploadImage,
} = require('./pictures.controller')
var multer = require('multer');
const path = require('path');
const verify = require('../../utils/auth');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.route('/')
    .post(createOne);

router.route('/:id')
    .get(verify, getOne)
    .put(verify, updateOne)
    .post(verify, upload.array('image', 5), uploadImage)

module.exports = router;