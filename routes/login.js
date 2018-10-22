var express = require('express');
var router = express.Router();
var sinaOAuth2 = require('../lib/sinaOAuth2');
let $util = require('../util/util');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/getWeiboAccessToken', function(req, res, next) {
    var sinaoauth2 = new sinaOAuth2();
    sinaoauth2.getAccessToken(req, res);
});
router.post('/loginByWeibo', function(req, res, next) {
    var sinaoauth2 = new sinaOAuth2();
    sinaoauth2.login(req, res);
});

module.exports = router;