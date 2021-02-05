const jwt = require("jsonwebtoken");
const { HttpStatusCode } = require("./errorHandler");



async function auth(req, res, next) {
    let accessToken = req.headers['token'];
    let id = req.headers['id'];
    req.status = 1;
    if (!accessToken) {
        req.status = -1;
    }
    try {
        const result = await jwt.verify(accessToken, "matcha-secret-code");
        req.id = result.id;
        if (req.id != id)
            req.status = -1;
    } catch (err) {
        let errorMessage = -1;
        if (err.expiredAt)
            errorMessage = 0;
        req.status = errorMessage;
    }
    if (req.status === 0 || req.status === -1) {
        return res
            .status(HttpStatusCode.AUTH_FAILD)
            .send({ status: req.status, message: "token is invalid or expired" });
    }
    next();
}

module.exports = auth;