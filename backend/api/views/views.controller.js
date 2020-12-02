const controllers = require('../../utils/crud');
const model = require('./views.model');

const controller = controllers(model);
module.exports = controller;