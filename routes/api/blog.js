var express = require('express');
var router = express.Router();
var util = require('../../lib/util.js')
var blogDao = require('../../dao/blog/index');

/* GET home page. */
router.get('/list', blogDao.list);
router.post('/list', blogDao.list);

router.get('/getDetails',  blogDao.getDetails);
router.post('/getDetails',  blogDao.getDetails);

router.post('/publicBlog', util.ensureAuthorized, blogDao.publicBlog);


module.exports = router;