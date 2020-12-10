const jwt = require('jsonwebtoken');
const model = require('../api/users/user.model');
const SER = require('../config/index');


const confirmEmail = async(req, res) => {
    try {
        const info = jwt.verify(req.params.id, 'matcha-secret-code');
        const [data] = await model.findOne(null, info.id);
        data.verified = 1;
        data.lastConnection = new Date().toISOString().slice(0, 19).replace("T", " ");
        data.lastNotification = new Date().toISOString().slice(0, 19).replace("T", " ");
        const result = await model.findOneAndUpdate(info.id, info.id, data);
        res.redirect(`${SER.HOST}:${SER.FRONT_PORT}`);
    } catch (err) {
        console.log(err)
        res.status(400).send({ msg: "invalid URL !!" });
    }
}

module.exports = confirmEmail;