const controllers = require('../../utils/crud');
const model = require('./location.model');
const { HTTP404Error, HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

async function getOne(req, res, next) {
    try {
        if (req.status && (req.status === 0 || req.status === -1)) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const data = await model.findOne(req.id);
        if (!data.length)
            throw new HTTP404Error('location not found');
        data[0].status = 1;
        res.status(HttpStatusCode.OK).json(data[0]);
    } catch (err) {
        next(err);
    }
};

async function createOne(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            if (req.body && req.body.user_id) {
                await model.create(req.body);
                res.status(HttpStatusCode.OK).send({
                    msg: "create Done!!",
                });
            } else
                throw new HTTP400Error();
        }
    } catch (err) {
        next(err);
    }
};

async function updateOne(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const body = req.body;
        if (body && !isNaN(body.longitude) && !isNaN(body.latitude) &&
            body.location_name) {
            await model.findOneAndUpdate(req.id, req.body);
            res.status(HttpStatusCode.OK).send({
                status: 1,
                msg: "Update Done!!",
            });
        } else
            throw new HTTP400Error('invalid req params');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getOne: getOne,
    createOne: createOne,
    updateOne: updateOne,
};