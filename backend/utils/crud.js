const getMany = (module) => async(req, res) => {
    try {
        const data = await module.findall(req.user.id);
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

const getOne = (module) => async(req, res) => {
    try {
        const data = await module.findOne(req.user.id, req.params.id);
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

const createOne = (module) => async(req, res) => {
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

const updateOne = (module) => async(req, res) => {
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

const removeOne = (module) => async(req, res) => {
    try {
        await module.findOneAndRemove(req.user.id, req.params.id);
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