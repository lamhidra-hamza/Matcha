const controllers = require('../../utils/crud');
const model = require('./chat.model');


const controller = controllers(model);
module.exports = controller;