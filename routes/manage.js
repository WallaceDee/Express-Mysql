var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('manage/index.html');
});
router.get('/index', function(req, res, next) {
    res.render('manage/index.html');
});
router.get('/login', function(req, res, next) {
    res.render('manage/login.html');
});
router.get('/users', function(req, res, next) {
    res.render('manage/users/users.html');
});

router.get('/article/category', function(req, res, next) {
    res.render('manage/article/category.html');
});
router.get('/article', function(req, res, next) {
    res.render('manage/article/article.html');
});
module.exports = router;