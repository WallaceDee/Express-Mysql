const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const blogDao = require('../../dao/blog/index')

router.get('/list', blogDao.list)
router.post('/list', blogDao.list)

router.get('/getDetails',  blogDao.getDetails)
router.post('/getDetails',  blogDao.getDetails)

router.post('/publicBlog', util.ensureAuthorized, blogDao.publicBlog)

module.exports = router