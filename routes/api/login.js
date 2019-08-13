const express = require('express')
const router = express.Router()
const OAuth2 = require('../../lib/OAuth2.js')
const oauth2 = new OAuth2()
router.post('/getWeiboAccessToken',oauth2.getAccessTokenWithWeibo)
router.post('/loginByWeibo',oauth2.loginWithWeibo)
router.post('/getQQAccessToken',oauth2.getAccessTokenWithQQ)
router.post('/loginByQQ', oauth2.loginWithQQ)

module.exports = router