const {
    createDB
} = require('./createdb.controller');
const router = require('express').Router();
router.post('/', createDB);
module.exports = router;