const model = require('./block.model');
const { HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

async function createOne(req, res, next) {
    try {
        if (req.body && req.body.blocked_user) {
            await model.create(req.id, req.body);
            res.status(HttpStatusCode.OK).send({
                msg: "create Done!!",
            });
        } else throw new HTTP400Error('invalid params');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOne: createOne
};