const model = require('./tags.model');

const getAll = async(req, res) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(200).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const result = await model.AllTags();
            console.log(result);
            res.status(200).json({
                tags: result,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error UserID = ${req.user.id} Does not exists`,
        });
    }
}

const getMany = async(req, res) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(200).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const data = await model.findall(req.id);
            res.status(200).json({
                data: [...data.map((item => { return item.tag }))],
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error UserID = ${req.user.id} Does not exists`,
        });
    }
};

const getOne = async(req, res) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(200).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const data = await model.findall(req.params.id);
            res.status(200).json({
                data: [...data.map((item => { return item.tag }))],
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error UserID = ${req.user.id} Does not exists`,
        });
    }
};

const createOne = async(req, res) => {
    try {
        if (req.status === 0 || req.status === -1)
            res.status(200).send({ status: req.status, message: "token is invalid or expired" });
        else {
            const newTags = req.body;
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
            res.status(201).send({
                tags: [...data.map((item => { return item.tag }))],
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
    getAll: getAll
};