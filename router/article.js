const express = require("express")
const router = express.Router()
const articleHandler = require("../routerHandler/article")
const expressJoi = require("@escook/express-joi")
const { reg_arctile, reg_speciArc } = require("../schema/article")

router.get("/getArticleList", articleHandler.getArticleList)

router.post("/addArticle", expressJoi(reg_arctile), articleHandler.addArticle)

router.get("/delArticle/:id", articleHandler.delArticle)

router.get("/getSpeciArc/:id", expressJoi(reg_speciArc), articleHandler.getSpeciArc)

module.exports = router
