const express = require("express")
const router = express.Router()
const gradeHandler = require("../routerHandler/gradeHandler")

router.post("/addGrade", gradeHandler.gradeHandler)

module.exports = router
