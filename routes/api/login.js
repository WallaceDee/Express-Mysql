var express = require('express');
var router = express.Router();
var sinaOAuth2 = require('../../lib/sinaOAuth2');
let $util = require('../../lib/util');

router.post('/getWeiboAccessToken', function(req, res, next) {
    var sinaoauth2 = new sinaOAuth2();
    sinaoauth2.getAccessTokenWithWeibo(req, res);
});
router.post('/loginByWeibo', function(req, res, next) {
    var sinaoauth2 = new sinaOAuth2();
    sinaoauth2.loginWithWeibo(req, res);
});

router.post('/getQQAccessToken', function(req, res, next) {
    var sinaoauth2 = new sinaOAuth2();
    sinaoauth2.getAccessTokenWithQQ(req, res);
});
router.post('/loginByQQ', function(req, res, next) {
    var sinaoauth2 = new sinaOAuth2();
    sinaoauth2.loginWithQQ(req, res);
});

module.exports = router;