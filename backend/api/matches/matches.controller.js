const controllers = require('../../utils/crud');
const model = require('./matches.model');

const controller = controllers(model);
module.exports = controller;