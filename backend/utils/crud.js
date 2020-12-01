const getMany = (module) => async(req, res) => {
    try {
        const data = await module.findall();
        res.status(200).json({ data: data })
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}

const getOne = (module) => async(req, res) => {
    try {
        const data = await module.findOne(req.params.id);
        if (!data) {
            res.status(400).end();
        }
        res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}

const createOne = (module) => async(req, res) => {
    try {
        await module.create(req.body);
        res.status(201).send({ msg: "User created!!" });
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}

const updateOne = (module) => async(req, res) => {
    try {
        console.log(req.params);
        await module.findOneAndUpdate(req.params.id, req.body);
        res.status(201).send({ msg: "User Updated!!" });
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}

const removeOne = (module) => async(req, res) => {

}

const controllers = (module) => ({
    removeOne: removeOne(module),
    updateOne: updateOne(module),
    getMany: getMany(module),
    getOne: getOne(module),
    createOne: createOne(module)
})

module.exports = controllers;