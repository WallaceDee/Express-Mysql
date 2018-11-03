var express = require('express');
var router = express.Router();
var commentDao = require('../../dao/comment/index');
var util = require('../../util/util.js')
/* GET users listing. */
router.post('/getCommentList', (req, res, next) => {
    commentDao.getCommentListByArticleId(req, res, next)
});

router.post('/addComment', util.ensureAuthorized, (req, res, next) => {
    commentDao.addComment(req, res, next)
});


module.exports = router