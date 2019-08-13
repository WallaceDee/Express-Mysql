const express = require('express')
const router = express.Router()
const userDao = require('../../dao/user/index')
const util = require('../../lib/util.js')

router.post('/list', util.ensureAuthorized, userDao.list)
router.post('/deleteUser', util.ensureAuthorized,   userDao.delete)
router.post('/updateUser', util.ensureAuthorized,userDao.update)
router.post('/register',  userDao.register)
router.post('/login',  userDao.login)
router.get('/getAdminUserInfo',  userDao.getAdminUserInfo)
router.post('/modify', userDao.modify)
router.post('/getUserAvailable',  userDao.getUserAvailable)

module.exports = router