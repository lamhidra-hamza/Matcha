const controllers = require('../../utils/crud');
const model = require('./block.model');

const controller = controllers(model);
module.exports = controller;