var express = require('express');
var router = express.Router();
var util = require('../../lib/util.js')
var palDao = require('../../dao/pal/index');

/* GET home page. */
router.get('/getCategoryList', (req, res, next) => {
    palDao.getCategoryList(req, res, next)
});

router.get('/getItemListByCategoryId', (req, res, next) => {
    palDao.getItemListByCategoryId(req, res, next)
});

router.get('/getCharacterList', (req, res, next) => {
    palDao.getCharacterList(req, res, next)
});

router.get('/getMusicList', (req, res, next) => {
    palDao.getMusicList(req, res, next)
});


module.exports = router;