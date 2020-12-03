const controllers = require('../../utils/crud');
const model = require('./pictures.model');

const uploadImage = (req, res, next) => {
    try {
        req.body = req.files;
        next();
    } catch (err) {
        console.log(err);
    }
}

const controller = controllers(model);
module.exports = {
    controllers: controller,
    uploadImage: uploadImage,
};