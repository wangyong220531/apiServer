const express = require("express")
const router = express.Router()
const gradeHandler = require("../routerHandler/gradeHandler")

router.post("/addGrade", gradeHandler.addGrade)

router.get("/getGradeList", gradeHandler.getGradeList)

module.exports = router
