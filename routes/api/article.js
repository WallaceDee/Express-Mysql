var express = require('express');
var router = express.Router();
var util = require('../../util/util.js')
var articleDao = require('../../dao/article/articleDao');

/* GET home page. */
router.post('/list', util.ensureAuthorized, (req, res, next) => {
    articleDao.list(req, res, next)
});

router.post('/publicArticle', util.ensureAuthorized, function(req, res, next) {
    articleDao.publicArticle(req, res, next)
});

router.post('/getCategoryList', util.ensureAuthorized, function(req, res, next) {
    articleDao.getCategoryList(req, res, next)
});

router.post('/createCategory', util.ensureAuthorized, function(req, res, next) {
    articleDao.createCategory(req, res, next)
});

router.post('/deleteCategory', util.ensureAuthorized, function(req, res, next) {
    articleDao.deleteCategory(req, res, next)
});
router.post('/updateCategoryName', util.ensureAuthorized, function(req, res, next) {
    articleDao.updateCategoryName(req, res, next)
});

router.post('/updateCategoryParentId', util.ensureAuthorized, function(req, res, next) {
    articleDao.updateCategoryParentId(req, res, next)
});

router.post('/setCategoryToTop', util.ensureAuthorized, function(req, res, next) {
    articleDao.setCategoryToTop(req, res, next)
});

router.post('/deleteArticle', util.ensureAuthorized, function(req, res, next) {
    articleDao.deleteArticle(req, res, next)
});

router.post('/getArticleByCategoryId', util.ensureAuthorized, function(req, res, next) {
    articleDao.getArticleByCategoryId(req, res, next)
});

module.exports = router;