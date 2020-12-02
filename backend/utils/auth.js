const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.cookies.authcookie;
    if (!token)
        return res.status(400).send('you dont have the permission ! please login');
    try {
        const verified = jwt.verify(token, 'matcha-secret-code');
        req.user = verified;
        console.log(verified.username);
        next();
    } catch(err){
        res.status(400).send('invalid token brother');
    }
}

module.exports = auth;