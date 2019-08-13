const express = require('express')
const router = express.Router()
const commentDao = require('../../dao/comment/index')
const util = require('../../lib/util.js')

router.get('/getCommentList', commentDao.getCommentListByArticleId)
router.post('/getCommentList', commentDao.getCommentListByArticleId)

router.post('/addComment', util.ensureAuthorized, commentDao.addComment)

router.post('/addCommentAnonymous',  commentDao.addCommentAnonymous)

module.exports = router