const model = require("./matches.model");
const { HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");

const getMany = async(req, res, next) => {
    try {
        const filters = req.query;
        if (filters && !isNaN(filters.numberOfItem) && !isNaN(filters.page)) {
            const data = await model.findall(req.id, filters);
            res.status(HttpStatusCode.OK).json({
                data: data,
            });
        } else
            throw new HTTP400Error('Invalid req query params');
    } catch (err) {
        next(err);
    }
};

const getAllInfo = async(req, res, next) => {
    try {
        const data = await model.findAllInfo(req.params.id, req.headers['id']);
        if (!data)
            throw new HTTP400Error('Bad request')
        res.status(HttpStatusCode.OK).json({
            user: data
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
            if (req.body && req.body.matched_user) {
                await model.create(req.id, req.body);
                res.status(HttpStatusCode.Ok).send({
                    msg: "create Done!!",
                });
            } else
                throw new HTTP400Error('invalid params');
        }
    } catch (err) {
        next(err);
    }
};

const deleteOne = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            if (req.body && req.body.unmatched_user) {
                await model.unMatch(req.id, req.body);
                res.status(200).send({
                    msg: "create Done!!",
                });
            } else
                throw new HTTP400Error('invalid params');
        }
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getMany: getMany,
    createOne: createOne,
    getAllInfo: getAllInfo,
    deleteOne: deleteOne
};