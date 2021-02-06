var moment = require('moment');


const logger = (req, res, next) => {
    
    next();
}

module.exports = logger;