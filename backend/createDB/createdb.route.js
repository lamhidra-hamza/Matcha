const createDB = require('./createdb.controller');
const router = require('express').Router();
router.get('/', createDB);
module.exports = router;