const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const articleDao = require('../../dao/article/index')

router.post('/list', articleDao.list)
router.get('/list', articleDao.list)

router.post('/deleteArticle', util.ensureAuthorized, articleDao.deleteArticle)

router.get('/getArticleDetail', articleDao.getArticleDetail)
router.post('/getArticleDetail', articleDao.getArticleDetail)

module.exports = router