const controllers = require('../../utils/crud');
const model = require('./messages.model');


const controller = controllers(model);
module.exports = controller;