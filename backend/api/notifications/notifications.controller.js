const model = require("./notifications.model");
const { HTTP404Error, HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

const getMany = async(req, res, next) => {
    try {
        const data = await model.findall(req.id);
        res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

const getOne = async(req, res, next) => {
    try {
        const data = await model.findOne(req.id, req.params.id);
        if (!data.length)
            throw new HTTP404Error('user not fount');
        res.status(HttpStatusCode.OK).json({
            data: data[0]
        });
    } catch (err) {
        next(err);
    }
};

const createOne = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const body = req.body;
            if (body && body.notifiedId && body.type) {
                let result = await model.create(req.id, body);
                res.status(HttpStatusCode.OK).send(result);
            } else
                throw new HTTP400Error('invalid req params');
        }
    } catch (err) {
        next(err);
    }
};

const updateOne = async(req, res, next) => {
    try {
        if (req.body && req.body.readed) {
            await model.findOneAndUpdate(req.id, req.params.id, req.body);
            res.status(HttpStatusCode.OK).send({
                msg: "Update Done!!",
            });
        } else
            throw new HTTP400Error('invalid req params');
    } catch (err) {
        next(err);
    }
};

const removeOne = async(req, res, next) => {
    try {
        await model.findOneAndRemove(req.id, req.params.id);
        res.status(HttpStatusCode.OK).send({
            msg: "Remove Done!!",
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    removeOne: removeOne,
    updateOne: updateOne,
    getMany: getMany,
    getOne: getOne,
    createOne: createOne,
};