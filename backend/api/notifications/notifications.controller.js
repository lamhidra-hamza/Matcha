const model = require("./notifications.model");

const getMany = async(req, res) => {
    const filters = req.query;
    try {
        const data = await model.findall(req.id, filters);
        console.log("id==", req.id, "data==", data);
        res.status(200).json({
            data: data,
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
        console.log("id getOne === ", req.id)
        const data = await model.findOne(req.id, req.params.id);
        if (!data) {
            res.status(400).end();
        }
        res.status(200).json({
            data: data[0]
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
            let result = await model.create(req.id, req.body);
            res.status(201).send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in createOne`,
        });
    }
};

const updateOne = async(req, res) => {
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
    removeOne: removeOne,
    updateOne: updateOne,
    getMany: getMany,
    getOne: getOne,
    createOne: createOne,
};