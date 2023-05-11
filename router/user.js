const express = require("express")
const router = express.Router()
const userHandler = require("../routerHandler/user")
const expressJoi = require("@escook/express-joi")
const { loginReg } = require("../schema/user")

router.post("/register", expressJoi(loginReg), userHandler.register)

router.post("/login", expressJoi(loginReg), userHandler.login)

module.exports = router
