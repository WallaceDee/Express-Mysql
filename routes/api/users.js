const express = require('express')
const router = express.Router()
const userDao = require('../../dao/user/index')
const util = require('../../lib/util.js')
/* GET users listing. */

router.post('/list', util.ensureAuthorized, userDao.list);

router.post('/deleteUser', util.ensureAuthorized, function(req, res, next) {
    userDao.delete(req, res, next)
});
router.post('/updateUser', util.ensureAuthorized, function(req, res, next) {
    userDao.update(req, res, next)
});


router.post('/register', function(req, res, next) {
    userDao.register(req, res, next)
});
router.post('/login', function(req, res, next) {
    userDao.login(req, res, next)
});
router.get('/getAdminUserInfo', function(req, res, next) {
    userDao.getAdminUserInfo(req, res, next)
});
router.post('/modify', function(req, res, next) {
    userDao.modify(req, res, next)
});

router.post('/getUserAvailable', function(req, res, next) {
    userDao.getUserAvailable(req, res, next)
});

module.exports = router;