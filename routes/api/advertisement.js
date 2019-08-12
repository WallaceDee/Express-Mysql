var express = require('express');
var router = express.Router();
var util = require('../../lib/util.js')
var adDao = require('../../dao/advertisement/index');

/* GET home page. */
router.get('/list', (req, res, next) => {
    adDao.list(req, res, next)
});

module.exports = router;