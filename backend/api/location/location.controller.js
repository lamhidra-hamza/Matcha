const controllers = require('../../utils/crud');
const model = require('./location.model');


const controller = controllers(model);
module.exports = controller;