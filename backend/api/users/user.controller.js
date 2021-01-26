const model = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serInfo = require("../../config/index");
const serverInfo = require("../../config/index");
const nodemailer = require("nodemailer");
const e = require("express");
const { HTTP400Error, HTTP404Error, HTTP500Error, HttpStatusCode } = require("../../utils/errorHandler");

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
            if (err)
                return err;
            console.log("Message sent");
        }
    );
}

async function updateEmailConfirm(req, res, next) {
    if (!req.body.verified)
        sendConfirmationEmail(req.params.id, req.body.username, req.body.email);
    next();
}

async function signIn(req, res, next) {
    try {
        const body = req.body;
        const result = await model.findOneByEmail(null, body.email);
        if (!result[0] || !body.password || !body.email) {
            throw new HTTP403Error('your email is incorrect');
        } else {
            body.password = await bcrypt.hash(body.password, 11);
            if (bcrypt.compare(result[0].password, body.password)) {
                const access_token = jwt.sign({ id: result[0].id, type: "access-token" },
                    "matcha-secret-code", { expiresIn: "20d" }
                );
                const refresh_token = jwt.sign({
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
                throw new HTTP403Error('your password is incorrect');
        }
    } catch (err) {
        next(err);
    }
}

async function getToken(req, res) {
    try {
        const refreshToken = req.cookies.authcookie;
        let decoded = jwt.verify(refreshToken, "matcha-secret-code");
        const result = await model.findOneById(decoded.id);
        if (result[0] && result[0].refreshToken !== refreshToken) {
            res.send({ status: 0, message: "your refresh token is invalid" });
        } else {
            const access_token = jwt.sign({ id: result[0].id, type: "access-token" },
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
            .status(HttpStatusCode.OK)
            .send({ status: 0, message: "please login refresh token is invalid" });
    }
}

async function signUp(req, res, next) {
    try {
        const body = req.body;
        if (!body.username || !body.email || !body.bornDate ||
            !body.firstName || !body.lastName || !body.password) {
            throw new HTTP400Error("Invalid request data");
        }
        const search = await model.findOneByEmail(null, body.email);

        console.log("search ========= ", search)
        if (search[0] && search[0].email === body.email)
            new HTTP400Error("Email exist");

        const result = await model.create(body);

        if (!result.id)
            throw new HTTP500Error();
        sendConfirmationEmail(result.id, result.username, body.email);
        res.status(HttpStatusCode.OK).send(result);
    } catch (err) {
        next(err);
    }
}

async function signOut(req, res) {
    res.cookie("authcookie", "").send({ status: 1, message: "loggedout" });
}

async function checkSession(req, res, next) {
    const token = req.cookies.authcookie;
    if (!token)
        return res.status(HttpStatusCode.OK).json({
            status: 0,
        });
    try {
        const verified = jwt.verify(token, "matcha-secret-code");
        req.user = verified;
        res.status(HttpStatusCode.OK).send({
            user: verified.id,
            status: 1,
            redirectUrl: "/app",
        });
    } catch (err) {
        next(err);
    }
}


async function getOneForInfoCard(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const data = await model.findOneInfoCard(req.id, req.params.id);
        if (data && data[0]) {
            data[0].status = 1;
            res.status(HttpStatusCode.OK).json(data[0]);
        } else throw new HTTP404Error('User Not Found');

    } catch (err) {
        next(err);
    }
}

async function getOne(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const data = await model.findOne(req.id, req.params.id);
        if (data && data[0]) {
            delete data[0].password;
            delete data[0].refreshToken;
            data[0].status = 1;
            res.status(HttpStatusCode.OK).json(data[0]);
        } else
            throw new HTTP404Error('User Not Found');
    } catch (err) {
        next(err);
    }
}

async function getMany(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const filters = req.query;
        if (filters && !isNaN(filters.frameRate) && !isNaN(filters.numberOfItem) && !isNaN(filters.page) &&
            !isNaN(filters.minAge) && !isNaN(filters.maxAge) &&
            !isNaN(filters.maxDistance)) {
            const data = await model.findall(req.id, filters);
            res.status(HttpStatusCode.OK).json({
                users: data,
                status: 1
            });
        } else
            throw new HTTP400Error('Invalid query params');
    } catch (err) {
        next(err);
    }
}


async function getManyUsersLikedMe(req, res, next) {
    try {
        if (req.status === 0 || req.status === -1) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const filters = req.query;
        if (!filters || isNaN(filters.page) || isNaN(filters.numberOfItem))
            throw new HTTP400Error('invalid query params');
        else {
            const data = await model.findallLikedMe(req.id, filters);
            res.status(HttpStatusCode.OK).json({
                users: data,
                status: 1
            });
        }
    } catch (err) {
        next(err);
    }
}

async function getManyUsersViewedMe(req, res, next) {

    try {
        if (req.status === 0 || req.status === -1) {
            res.status(HttpStatusCode.OK).send({
                status: req.status,
            });
            return;
        }
        const filters = req.query;
        if (!filters || isNaN(filters.page) || isNaN(filters.numberOfItem))
            throw new HTTP400Error('invalid query params');
        else {
            const data = await model.findallViewedMe(req.id, filters);
            res.status(HttpStatusCode.OK).json({
                users: data,
                status: 1
            });
        }
    } catch (err) {
        next(err);
    }
}

async function updateOne(req, res, next) {
    const body = req.body;
    try {
        if (req.status === 0 || req.status === -1) {
            res
                .status(HttpStatusCode.OK)
                .send({ status: req.status, message: "token is invalid or expired" });
        } else {
            const data = await model.findOne(req.id, req.id);
            if (data.length == 0)
                throw HTTP404Error('user not Found');
            for (const [key, value] of Object.entries(body)) {
                data[0][key] = value;
            }
            await model.findOneAndUpdate(
                req.id,
                req.id,
                data[0]
            );
            res.status(HttpStatusCode.OK).send({ status: req.status, msg: "updating Done" });
        }
    } catch (err) {
        next(err);
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
    updateOne: updateOne,
    removeOne: removeOne,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    getToken: getToken,
    checkSession: checkSession,
    updateEmailConfirm: updateEmailConfirm,
    getOneForInfoCard: getOneForInfoCard,
    getManyUsersLikedMe: getManyUsersLikedMe,
    getManyUsersViewedMe: getManyUsersViewedMe,
};