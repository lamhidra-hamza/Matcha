const controllers = require('../../utils/crud');
const model = require('./user.model');

const controller = controllers(model);
module.exports = controller;