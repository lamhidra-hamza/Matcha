const getMany = (module) => async(req, res) => {
    try {
        const data = await module.findall();
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}

const getOne = (module) => async(req, res) => {

}

const createOne = (module) => async(req, res) => {

}

const updateOne = (module) => async(req, res) => {

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