const controllers = require("../../utils/crud");
const model = require("./firstcheck.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function signIn(req, res) {
    console.log("\nSignin Function");
    const body = req.body;
    const result = await model.findOne("0", body.email);
    if (!result[0] || !body.password || !body.email) {
        res.status(403).send({ status: 0, message: "you dont have an account" });
    } else {
        console.log(body.password);
        body.password = await bcrypt.hash(body.password, 11);
        console.log(body.password);
        console.log(result[0].password);
        if (bcrypt.compare(result[0].password, body.password)) {
            const token = jwt.sign({ id: result[0].id, username: result[0].username },
                "matcha-secret-code"
            );
            res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true }).send({ status: 1, message: "logged" });
        } else
            res.status(403).send({ status: 0, message: "the password if incorrect" });
    }
}

async function checkuser (req, res){
    const token = req.cookies.authcookie;
    console.log(`token ${token}`);
    console.log("here here");
    if (!token)
        return res.status(200).json(
            {
                success :0
            }
        );
    try {
        const verified = await jwt.verify(token, 'matcha-secret-code');
        req.user = verified;
        console.log(`the token is ${verified}`);
        res.status(200).json({
            success : 1,
            user : verified.id,
            status: "logged",
            redirectUrl: '/app'
        });
    } catch(err){
        console.log(err);
    }
}


async function signUp(req, res) {
    const body = req.body;
    console.log(body)
    const result = await model.create(body);
    const token = jwt.sign({ id: result.id, username: result.username },
        "matcha-secret-code"
    );

    res
        .cookie("authcookie", token, {
            maxAge: 900000,
            httpOnly: true,
        })
        .send(result);
}

async function signOut(req, res) {
    res.cookie('authcookie', "").send({ status: 1, message: "loggedout" });
}

module.exports = {
    signIn: signIn,
    controllers: controllers(model),
    signUp: signUp,
    signOut: signOut,
    checkuser: checkuser
};