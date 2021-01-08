const controllers = require('../../utils/crud');
const model = require('./location.model');

async function getMany(req, res) {
    try {
        const data = await model.findall(req.id);
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

async function getOne(req, res) {
    console.log("the user id is ", req.id);
    try {
        const data = await model.findOne(req.id, req.id);
        if (!data[0] || (req.status && (req.status === 0 || req.status === -1))) {
            res.status(200).send({
                status: req.status,
            });
            return;
        }
        data[0].status = 1;
        res.status(200).json(data[0]);
    } catch (err) {
        console.log("error");
        console.log(err);
        res.status(400).end({
            msg: `Error in getOne`,
        });
    }
};

async function createOne(req, res) {
    console.log("create one pictures");
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

async function updateOne(req, res) {
    console.log("the user id is ", req.id);
    console.log("the body isssssssssss ", req.body);
    try {
        console.log("heeere");
        if (req.status === 0 || req.status === -1) {
            res.status(200).send({
                status: req.status,
            });
            return;
        }
        let putting_result = await model.findOneAndUpdate(req.id, req.body);
        console.log(putting_result);
        res.status(201).send({
            status: 1,
            msg: "Update Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            status: 0,
            msg: `Error in updateOne`,
        });
    }
};

async function removeOne(req, res) {
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
    getOne: getOne,
    getMany: getMany,
    createOne: createOne,
    updateOne: updateOne,
    removeOne: removeOne,
};