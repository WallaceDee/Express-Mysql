var express = require('express');
var router = express.Router();
var util = require('../util/util.js')
var articleDao = require('../dao/article/articleDao');

/* GET home page. */
router.post('/publicArticle', util.ensureAuthorized, function(req, res, next) {
    articleDao.publicArticle(req, res, next)
});

router.post('/getCategoryList', util.ensureAuthorized, function(req, res, next) {
    articleDao.getCategoryList(req, res, next)
});

module.exports = router;