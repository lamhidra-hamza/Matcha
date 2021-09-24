const controllers = require('../../utils/crud');
const model = require('./pictures.model');
var fs = require('fs');
const { HTTP404Error, HTTP400Error, HttpStatusCode } = require("../../utils/errorHandler");


const uploadImage = async(req, res, next) => {
    try {
        const data = await model.findOneById(req.params.id);
        if (!data.length)
            throw new HTTP404Error('pictures not found');
        let arr = [
            data[0].picture_1,
            data[0].picture_2,
            data[0].picture_3,
            data[0].picture_4,
            data[0].picture_5
        ];
        arr = arr.filter(value => { return value != null });
        req.files.map((value) => { arr.push(value.filename); });
        await model.findOneAndUpdate(req.id, req.params.id, {
            picture_1: arr[0] ? arr[0] : null,
            picture_2: arr[1] ? arr[1] : null,
            picture_3: arr[2] ? arr[2] : null,
            picture_4: arr[3] ? arr[3] : null,
            picture_5: arr[4] ? arr[4] : null,
        });
        res.status(HttpStatusCode.OK).json({
            arr
        });
    } catch (err) {
        next(err);
    }
};


async function getOne(req, res, next) {
    try {
        const data = await model.findOne(req.id, req.params.id);
        if (!data.length)
            throw new HTTP404Error('picture not found');
        res.status(HttpStatusCode.OK).json(data[0]);
    } catch (err) {
        next(err);
    }
}

async function createOne(req, res, next) {
    try {
        if (req.body && req.body.user_id) {
            await model.create(req.body.user_id, req.body);
            res.status(HttpStatusCode.OK).send({
                msg: "create Done!!",
            });
        } else
            throw new HTTP400Error('invalid req params');
    } catch (err) {
        next(err);
    }
}

async function updateOne(req, res, next) {
    try {
        const body = req.body;
        const data = await model.findOneById(req.params.id);
        if (!data.length)
            throw new HTTP404Error('user not found');
        if (!body.picture_1 && data[0].picture_1 && fs.existsSync(data[0].picture_1))
            fs.unlinkSync(`uploads/${data[0].picture_1}`);
        if (!body.picture_2 && data[0].picture_2 && fs.existsSync(data[0].picture_2))
            fs.unlinkSync(`uploads/${data[0].picture_2}`);
        if (!body.picture_3 && data[0].picture_3 && fs.existsSync(data[0].picture_3))
            fs.unlinkSync(`uploads/${data[0].picture_3}`);
        if (!body.picture_4 && data[0].picture_4 && fs.existsSync(data[0].picture_4))
            fs.unlinkSync(`uploads/${data[0].picture_4}`);
        if (!body.picture_5 && data[0].picture_5 && fs.existsSync(data[0].picture_5))
            fs.unlinkSync(`uploads/${data[0].picture_5}`);
        delete body.id;
        delete body.user_id;
        await model.findOneAndUpdate(req.id, req.params.id, body);
        res.status(HttpStatusCode.OK).send({
            msg: "Update Done!!",
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOne: getOne,
    createOne: createOne,
    updateOne: updateOne,
    uploadImage: uploadImage
};