const model = require('./tags.model');

const getMany = async(req, res) => {
    try {
        const data = await model.findall(req.id);
        res.status(200).json({
            data: [...data.map((item => { return item.tag }))],
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error UserID = ${req.user.id} Does not exists`,
        });
    }
};

const getOne = async(req, res) => {
    try {
        const data = await model.findOne(req.id, req.params.id);
        if (!data) {
            res.status(400).end();
        }
        res.status(200).json({
            user: data[0]
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in getOne`,
        });
    }
};

const createOne = async(req, res) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(200).send({ status: req.status, message: "token is invalid or expired" });
        else {
            await model.create(req.id, req.body);
            res.status(201).send({
                msg: "create Done!!",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in createOne`,
        });
    }
};

const updateOne = () => async(req, res) => {
    try {
        await model.findOneAndUpdate(req.id, req.id, req.body);
        res.status(201).send({
            msg: "Update Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in updateOne`,
        });
    }
};

const removeOne = async(req, res) => {
    try {
        await model.findOneAndRemove(req.id, req.params.id);
        res.status(201).send({
            msg: "Remove Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in removeOne`,
        });
    }
};

module.exports = {
    getMany: getMany,
    getOne: getOne,
    createOne: createOne,
    updateOne: updateOne,
    removeOne: removeOne,
};