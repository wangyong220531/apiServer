const express = require("express")
const router = express.Router()
const userInfoHandler = require("../router_handler/userInfo")
const { updateUserInfoReg, updatePwd } = require("../schema/user")
const expressJoi = require("@escook/express-joi")

router.get("/getUserInfo", userInfoHandler.getUserInfo)

router.post("/updateUserInfo", expressJoi(updateUserInfoReg), userInfoHandler.updateUserInfo)

router.post("/updatePwd", expressJoi(updatePwd), userInfoHandler.updatePwd)

module.exports = router
