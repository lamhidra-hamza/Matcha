const controllers = require('../../utils/crud');
const model = require('./pictures.model');
var fs = require('fs');

const uploadImage = async(req, res) => {
    try {
        if (req.status === 0 || req.status === -1) {
            console.log(`the req.status is ${req.status}`);
            res
                .status(200)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            const data = await model.findOneById(req.params.id);
            let arr = [data[0].picture_1, data[0].picture_2, data[0].picture_3, data[0].picture_4, data[0].picture_5];
            arr = arr.filter(value => { return value != null });
            req.files.map((value) => { arr.push(value.filename); });
            const result = await model.findOneAndUpdate(req.id, req.params.id, {
                picture_1: arr[0] ? arr[0] : null,
                picture_2: arr[1] ? arr[1] : null,
                picture_3: arr[2] ? arr[2] : null,
                picture_4: arr[3] ? arr[3] : null,
                picture_5: arr[4] ? arr[4] : null,
            });
            console.log("result upload == ", arr)
            res.status(201).json({
                arr,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in createOne`,
        });
    }
};

async function getMany(req, res) {
    try {
        const data = await model.findall(req.id);
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error UserID = ${req.id} Does not exists`,
        });
    }
}

async function getOne(req, res) {
    try {
        const data = await model.findOne(req.id, req.params.id);
        if (!data) {
            res.status(400).end();
        }
        res.status(200).json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in getOne`,
        });
    }
}

async function createOne(req, res) {
    console.log("create one pictures=========== ===================================");
    try {
        if (req.status === 0 || req.status === -1) {
            console.log(`the req.status is ${req.status}`);
            res
                .status(200)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            await model.create(req.body.user_id, req.body);
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
}

async function updateOne(req, res) {
    try {
        const body = req.body;
        const data = await model.findOneById(req.params.id);
        if (!body.picture_1 && data[0].picture_1 && fs.existsSync(data[0].picture_1))
            fs.unlinkSync(data[0].picture_1);
        if (!body.picture_2 && data[0].picture_2 && fs.existsSync(data[0].picture_2))
            fs.unlinkSync(data[0].picture_2);
        if (!body.picture_3 && data[0].picture_3 && fs.existsSync(data[0].picture_3))
            fs.unlinkSync(data[0].picture_3);
        if (!body.picture_4 && data[0].picture_4 && fs.existsSync(data[0].picture_4))
            fs.unlinkSync(data[0].picture_4);
        if (!body.picture_5 && data[0].picture_5 && fs.existsSync(data[0].picture_5))
            fs.unlinkSync(data[0].picture_5);
        await model.findOneAndUpdate(req.id, req.params.id, req.body);
        res.status(201).send({
            msg: "Update Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in updateOne`,
        });
    }
}

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
}

module.exports = {
    getMany: getMany,
    getOne: getOne,
    createOne: createOne,
    updateOne: updateOne,
    removeOne: removeOne,
    uploadImage: uploadImage
};