const express = require('express');
const router = express.Router();
const util = require('../../lib/util.js')
const articleDao = require('../../dao/article/index');

/* GET home page. */
router.post('/list',articleDao.list);
router.get('/list',articleDao.list);

router.post('/publicArticle', util.ensureAuthorized, function(req, res, next) {
    articleDao.publicArticle(req, res, next)
});

router.post('/deleteArticle', util.ensureAuthorized, function(req, res, next) {
    articleDao.deleteArticle(req, res, next)
});

router.post('/getArticleByCategoryId', util.ensureAuthorized, function(req, res, next) {
    articleDao.getArticleByCategoryId(req, res, next)
});

router.get('/getArticleDetail', articleDao.getArticleDetail);
router.post('/getArticleDetail',   articleDao.getArticleDetail);

module.exports = router;