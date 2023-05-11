const express = require("express")
const router = express.Router()
const userInfoHandler = require("../routerHandler/userInfo")
const { updateUserInfoReg, updatePwd, updateAvator } = require("../schema/user")
const expressJoi = require("@escook/express-joi")

router.get("/getUserInfo", userInfoHandler.getUserInfo)

router.post("/updateUserInfo", expressJoi(updateUserInfoReg), userInfoHandler.updateUserInfo)

router.post("/updatePwd", expressJoi(updatePwd), userInfoHandler.updatePwd)

router.post("/updateAvator", expressJoi(updateAvator), userInfoHandler.updateAvator)

module.exports = router
