const router = require('express').Router();
const verify = require('./utils/auth');

router.get('/', verify, (req, res) => {
    res.json({
        status: 'logged',
        name: 'zakaria'
    });
});

module.exports = router;