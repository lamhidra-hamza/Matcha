const model = require('./tags.model');
const { HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");


const getAll = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const result = await model.AllTags();
            res.status(HttpStatusCode.OK).json({
                tags: result,
            });
        }
    } catch (err) {
        next(err)
    }
}

const getMany = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const data = await model.findall(req.id);
            res.status(HttpStatusCode.OK).json({
                data: [...data.map((item => { return item.tag }))],
            });
        }
    } catch (err) {
        next(err)
    }
};

const getOne = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const data = await model.findall(req.params.id);
            res.status(HttpStatusCode.OK).json({
                data: [...data.map((item => { return item.tag }))],
            });
        }
    } catch (err) {
        next(err)
    }
};

const createOne = async(req, res, next) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(HttpStatusCode.OK).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const newTags = req.body;
            if (!Array.isArray(newTags))
                throw new HTTP400Error('invalid req data');
            let data = await model.findall(req.id);
            const oldTags = await [...data.map((item => { return item.tag }))];
            newTags.map((item) => {
                if (!oldTags.includes(item)) {
                    model.create(req.id, item);
                }
            })
            oldTags.map((item, index) => {
                if (!newTags.includes(item)) {
                    model.findOneAndRemove(req.id, data[index].id);
                }
            })
            data = await model.findall(req.id);
            res.status(HttpStatusCode.OK).send({
                tags: [...data.map((item => { return item.tag }))],
            });
        }
    } catch (err) {
        next(err)
    }
};


const removeOne = async(req, res, next) => {
    try {
        await model.findOneAndRemove(req.id, req.params.id);
        res.status(HttpStatusCode.OK).send({
            msg: "Remove Done!!",
        });
    } catch (err) {
        next(err)
    }
};

module.exports = {
    getMany: getMany,
    getOne: getOne,
    createOne: createOne,
    removeOne: removeOne,
    getAll: getAll
};