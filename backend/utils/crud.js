const userID = "5fa32651-52e9-4cda-b75c-793c7907eeb3";

const getMany = (module) => async(req, res) => {
    try {
        const data = await module.findall(userID);
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error userID = ${userID} Does not exists`,
        });
    }
};

const getOne = (module) => async(req, res) => {
    try {
        const data = await module.findOne(userID, req.params.id);
        if (!data) {
            res.status(400).end();
        }
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in getOne`,
        });
    }
};

const createOne = (module) => async(req, res) => {
    try {
        // let userJsonData = await module.create(userID, req.body);
        // res.status(201).header('token', userJsonData.token).send(userJsonData);

        await module.create(userID, req.body);
        res.status(201).send({
            msg: "create Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in createOne`,
        });
    }
};

const updateOne = (module) => async(req, res) => {
    try {
        await module.findOneAndUpdate(userID, req.params.id, req.body);
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

const removeOne = (module) => async(req, res) => {
    try {
        await module.findOneAndRemove(userID, req.params.id);
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

const controllers = (module) => ({
    removeOne: removeOne(module),
    updateOne: updateOne(module),
    getMany: getMany(module),
    getOne: getOne(module),
    createOne: createOne(module),
});

module.exports = controllers;