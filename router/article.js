const express = require("express")
const router = express.Router()
const articleHandler = require("../routerHandler/article")
const expressJoi = require("@escook/express-joi")
const { reg_arctile } = require("../schema/article")

router.get("/getArticleList", articleHandler.getArticleList)

router.post("/addArticle", expressJoi(reg_arctile), articleHandler.addArticle)

router.get("/delArticle/:id", articleHandler.delArticle)

module.exports = router
