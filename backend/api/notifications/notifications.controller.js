const controllers = require('../../utils/crud');
const model = require('./notifications.model');


const controller = controllers(model);
module.exports = controller;