const model = require("./user.model");
const pictureModel = require("../pictures/pictures.model");
const locationModel = require("../location/location.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serInfo = require("../../config/index");
const serverInfo = require("../../config/index");
const nodemailer = require("nodemailer");
const validEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const validUserName = /^[a-zA-Z0-9]+$/;
const validName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;


const { HTTP400Error, HTTP404Error, HTTP403Error, HTTP500Error, HttpStatusCode } = require("../../utils/errorHandler");

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
            transporter.sendMail({
                to: `${email}`,
                subject: "[MATCHA] Email Confirmation",
                html: `<br>Please click on the link bellow to confirm your email Adress: </br><br><a href='${url}'>${url}</a></br>`, // html body
            });
            if (err)
                return err;
         
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
            let codeMatchResult = await bcrypt.compare(
                body.password,
                result[0].password
            );
            if (codeMatchResult) {
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
        if (!validEmail.test(body.email))
            throw new HTTP400Error("Invalid Email");
        if (!validUserName.test(body.username))
            throw new HTTP400Error("Invalid UserName");
        if (!validName.test(body.firstName))
            throw new HTTP400Error("Invalid FirstName");
        if (!validName.test(body.lastName))
            throw new HTTP400Error("Invalid LastName");
        if (!validPassword.test(body.password))
            throw new HTTP400Error("Invalid Password");

        const search = await model.findOneByEmail(null, body.email);

        if (search[0] && search[0].email === body.email)
            throw new HTTP400Error("Email exist");

        const result = await model.create(body);

        if (!result.id)
            throw new HTTP500Error();
        await pictureModel.create(result.id,{
            user_id: result.id,
            picture_1: null,
            picture_2: null,
            picture_3: null,
            picture_4: null,
            picture_5: null,
          });
        
        await locationModel.create({
            user_id: result.id,
        })
        
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
    } catch (err) {
        next(err);
    }
}

async function removeOne(req, res, next) {
    try {
        if (req.body && req.body.userID) {
            await model.findOneAndRemove(req.body.userID, req.params.id);
            res.status(201).send({
                msg: "Remove Done!!",
            });
        } else throw new HTTP400Error('invalid params');
    } catch (err) {
        next(err);
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