const controllers = require('../../utils/crud');
const model = require('./likes.model');

const controller = controllers(model);
module.exports = controller;