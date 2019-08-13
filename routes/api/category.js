const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const categoryDao = require('../../dao/category/index')

router.get('/list', categoryDao.list)

router.post('/create', util.ensureAuthorized, categoryDao.create)

router.post('/delete', util.ensureAuthorized,categoryDao.delete)

router.post('/updateCategoryName', util.ensureAuthorized, categoryDao.updateCategoryName)

router.post('/updateCategoryParentId', util.ensureAuthorized,categoryDao.updateCategoryParentId)

router.post('/setCategoryToTop', util.ensureAuthorized,  categoryDao.setCategoryToTop)

module.exports = router