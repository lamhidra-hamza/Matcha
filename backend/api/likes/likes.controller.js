const model = require('./likes.model');
const { HTTP404Error, HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

const createOne = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res
            .status(HttpStatusCode.OK)
            .send({ status: req.status, message: "token is invalid or expired" });
        else {
            if (!req.body || !req.body.liked_user)
                throw new HTTP400Error('invalid id');
            else {
                await model.create(req.id, req.body);
                res.status(HttpStatusCode.OK).send({
                    msg: "create Done!!",
                });
            }
        }
    } catch (err) {
        next(err);
    }
};

const getOne = async(req, res, next) => {
    try {
        const data = await model.findOne(req.id, req.params.id);
        if (!data.length)
            throw new HTTP404Error('not Found');
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