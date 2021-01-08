const model = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serInfo = require("../../config/index");
const serverInfo = require("../../config/index");
const nodemailer = require("nodemailer");
const e = require("express");

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: serInfo.user,
        pass: serInfo.pass,
    },
});

async function sendConfirmationEmail(id, userName, email) {
    jwt.sign({ id: id, username: userName },
        "matcha-secret-code", {
            expiresIn: "1d",
        },
        (err, emailToken) => {
            const url = `${serInfo.HOST}:${serverInfo.PORT}/confirmation/${emailToken}`;
            console.log(`${email}`);

            transporter.sendMail({
                to: `${email}`,
                subject: "[MATCHA] Email Confirmation",
                html: `<br>Please click on the link bellow to confirm your email Adress: </br><br><a href='${url}'>${url}</a></br>`, // html body
            });

            console.log("Message sent");
        }
    );
}

async function updateEmailConfirm(req, res, next) {
    if (!req.body.verified)
        sendConfirmationEmail(req.params.id, req.body.username, req.body.email);
    next();
}

async function signIn(req, res) {
    const body = req.body;
    const result = await model.findOneByEmail(null, body.email);
    if (!result[0] || !body.password || !body.email) {
        console.log("this email doesn't exist");
        res.status(403).send({ status: 0, message: "you dont have an account" });
    } else {
        body.password = await bcrypt.hash(body.password, 11);

        if (bcrypt.compare(result[0].password, body.password)) {
            const access_token = await jwt.sign({ id: result[0].id, type: "access-token" },
                "matcha-secret-code", { expiresIn: "20d" }
            );
            const refresh_token = await jwt.sign({
                    id: result[0].id,
                    type: "refresh-token",
                },
                "matcha-secret-code", { expiresIn: "10d" }
            );
            model.updateRefreshToken(result[0].id, refresh_token);
            res
                .cookie("authcookie", refresh_token, { httpOnly: true })
                .send({
                    status: 1,
                    id: result[0].id,
                    message: "logged",
                    accessToken: access_token,
                });
        } else
            res.status(403).send({ status: 0, message: "the password if incorrect" });
    }
}

async function getToken(req, res) {
    const refreshToken = req.cookies.authcookie;
    try {
        let decoded = await jwt.verify(refreshToken, "matcha-secret-code");
        const result = await model.findOneById(decoded.id);
        if (result[0].refreshToken !== refreshToken) {
            res.send({ status: 0, message: "your refresh token is invalid" });
        } else {
            const access_token = await jwt.sign({ id: result[0].id, type: "access-token" },
                "matcha-secret-code", { expiresIn: "20s" }
            );
            res.send({
                status: 1,
                message: "new access token",
                accessToken: access_token,
            });
        }
    } catch (err) {
        res
            .status(200)
            .send({ status: 0, message: "please login refresh token is invalid" });
    }
}

async function signUp(req, res) {
    const body = req.body;
    console.log(body);
    const result = await model.create(body);
    sendConfirmationEmail(result.id, result.username, body.email);
    res.send(result);
}

async function signOut(req, res) {
    res.cookie("authcookie", "").send({ status: 1, message: "loggedout" });
}

async function checkSession(req, res) {
    const token = req.cookies.authcookie;
    if (!token)
        return res.status(200).json({
            status: 0,
        });
    try {
        const verified = await jwt.verify(token, "matcha-secret-code");
        req.user = verified;
        res.status(200).send({
            user: verified.id,
            status: 1,
            redirectUrl: "/app",
        });
    } catch (err) {
        console.log(err);
    }
}

async function getOne(req, res) {
    try {
        const data = await model.findOne(req.id, req.id);
        if (!data || req.status === 0 || req.status === -1) {
            res.status(200).send({
                status: req.status,
            });
            return;
        }
        delete data[0].password;
        delete data[0].refreshToken;
        data[0].status = 1;
        res.status(200).json(data[0]);
    } catch (err) {
        console.log("error");
        console.log(err);
        res.status(400).end({
            msg: `Error in getOne`,
        });
    }
}

async function getMany(req, res) {
    const body = req.body;
    try {
        const data = await model.findall(body.userID);
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error userID = ${body.userID} Does not exists`,
        });
    }
}

async function createOne(req, res) {
    try {
        await model.create(userID, req.body);
        res.status(201).send({
            msg: "create Done!!",
        });
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in createOne`,
        });
    }
}

async function updateOne(req, res) {
    const body = req.body;
    try {
        if (req.status === 0 || req.status === -1) {
            // console.log(`the req.status is ${req.status}`);
            res
                .status(200)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            const data = await model.findOne(req.id, req.id);
            // console.log("the data is ", data[0]);
            for (const [key, value] of Object.entries(body)) {
                data[0][key] = value;
            }
            await model.findOneAndUpdate(
                req.id,
                req.id,
                data[0]
            );
            res.status(200).send({
                status: 1, message: "the user has beeen updateed"
            })
            // console.log("the new data is ==>");
            // console.log(data[0]);
        }
    } catch (err) {
        console.log(err);
        res.status(400).end({
            msg: `Error in updateOne`,
        });
    }
}

async function removeOne(req, res) {
    try {
        await model.findOneAndRemove(req.body.userID, req.params.id);
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
    getOne: getOne,
    getMany: getMany,
    createOne: createOne,
    updateOne: updateOne,
    removeOne: removeOne,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    getToken: getToken,
    checkSession: checkSession,
    updateEmailConfirm: updateEmailConfirm,
};