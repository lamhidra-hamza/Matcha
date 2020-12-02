const controllers = require('../../utils/crud');
const model = require('./tags.model');


const controller = controllers(model);
module.exports = controller;