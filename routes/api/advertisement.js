const express = require("express")
const router = express.Router()
const adDao = require("../../dao/advertisement/index")

router.get("/list", adDao.list)

module.exports = router
