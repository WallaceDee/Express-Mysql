var express = require('express');
var router = express.Router();
var util = require('../../util/util.js')
var blogDao = require('../../dao/blog/index');

/* GET home page. */
router.post('/list',  (req, res, next) => {
    blogDao.list(req, res, next)
});
router.post('/getDetails',  (req, res, next) => {
    blogDao.getDetails(req, res, next)
});


module.exports = router;