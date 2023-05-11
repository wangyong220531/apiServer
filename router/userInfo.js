const express = require("express")
const router = express.Router()
const userInfoHandler = require("../router_handler/userInfo")
const { updateUserInfoReg } = require("../schema/user")
const expressJoi = require("@escook/express-joi")

router.get("/getUserInfo", userInfoHandler.getUserInfo)

router.post("/updateUserInfo", expressJoi(updateUserInfoReg), userInfoHandler.updateUserInfo)

module.exports = router
