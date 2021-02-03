const controllers = require('../../utils/crud');
const model = require('./block.model');

const controller = controllers(model);


async function getMany(req, res){
    try {
        const data = await module.findall(req.id);
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

async function getOne(req, res){
    try {
        console.log("id getOne === ", req.id)
        const data = await module.findOne(req.id, req.params.id);
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

async function createOne(req, res){
    console.log("create one pictures");
    try {
        if (req.status === 0 || req.status === -1)
            res.status(200).send({ status: req.status, message: "token is invalid or expired" });
        else {
            await module.create(req.id, req.body);
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

async function updateOne(req, res){
    try {
        await module.findOneAndUpdate(req.id, req.id, req.body);
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

 async function removeOne(req, res){
    try {
        await module.findOneAndRemove(req.id, req.params.id);
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
    getMany  : getMany,
    getOne   : getOne,
    createOne: createOne,
};