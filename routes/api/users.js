var express = require('express');
var router = express.Router();
var userDao = require('../../dao/user/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user');
});
router.get('/list', (req, res, next) => {
    userDao.list(req, res, next)
});
router.post('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next)
});
router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next)
});


router.post('/register', function(req, res, next) {
    userDao.register(req, res, next)
});
router.post('/login', function(req, res, next) {
    userDao.login(req, res, next)
});
router.post('/getUserInfo', function(req, res, next) {
    userDao.getUserInfo(req, res, next)
});
router.post('/modify', function(req, res, next) {
    userDao.modify(req, res, next)
});

router.post('/getUserAvailable', function(req, res, next) {
    userDao.getUserAvailable(req, res, next)
});


module.exports = router;