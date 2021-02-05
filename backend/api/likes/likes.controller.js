const model = require('./likes.model');
const { HTTP404Error, HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

const createOne = async(req, res, next) => {
    try {
        if (!req.body || !req.body.liked_user)
            throw new HTTP400Error('invalid id');
        else {
            await model.create(req.id, req.body);
            res.status(HttpStatusCode.OK).send({
                msg: "create Done!!",
            });
        }
    } catch (err) {
        next(err);
    }
};

const getOne = async(req, res, next) => {
    try {
        const data = await model.findOne(req.id, req.params.id);
        res.status(HttpStatusCode.OK).json({
            user: data
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOne: createOne,
    getOne: getOne
};