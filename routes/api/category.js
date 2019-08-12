var express = require('express');
var router = express.Router();
var util = require('../../lib/util.js')
var categoryDao = require('../../dao/category/index');

router.get('/list', (req, res, next) => {
    categoryDao.list(req, res, next)
});

router.post('/create', util.ensureAuthorized, function(req, res, next) {
    categoryDao.create(req, res, next)
});

router.post('/delete', util.ensureAuthorized, function(req, res, next) {
    categoryDao.delete(req, res, next)
});

router.post('/updateCategoryName', util.ensureAuthorized, function(req, res, next) {
    categoryDao.updateCategoryName(req, res, next)
});

router.post('/updateCategoryParentId', util.ensureAuthorized, function(req, res, next) {
    categoryDao.updateCategoryParentId(req, res, next)
});

router.post('/setCategoryToTop', util.ensureAuthorized, function(req, res, next) {
    categoryDao.setCategoryToTop(req, res, next)
});

module.exports = router;