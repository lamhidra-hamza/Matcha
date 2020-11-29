const { create } = require('./user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(req, res) {
    const body = req.body;
    body.password = await bcrypt.hash(body.password, saltRounds)
    await create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database error please handle your shit"
            });
        }
        console.log("yeees");
        return res.status(200).json({
            success: 1,
            message: "the user has been created boss",
            userID : results
        });
    });
}

module.exports = {
    createUser: createUser
};