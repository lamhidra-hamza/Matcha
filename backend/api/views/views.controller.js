const controllers = require('../../utils/crud');
const model = require('./views.model');
const { HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");


const createOne = async(req, res, next) => {
    try {
        if (!req.body || !req.body.viewed_user)
            throw new HTTP400Error('invalid id');
        await model.create(req.id, req.body);
        res.status(HttpStatusCode.OK).send({
            msg: "create Done!!",
            status: 1
        });
    } catch (err) {
        next(err)
    }
};

module.exports = {
    createOne: createOne
};