const express = require("express")
const router = express.Router()
const userHandler = require("../routerHandler/user")
const expressJoi = require("@escook/express-joi")
const { registerReg, loginReg } = require("../schema/user")

router.post("/register", expressJoi(registerReg), userHandler.register)

/**,
 * @swagger
 * /api//register:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 账号注册
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 注册成功！
 *        400:
 *          description: 无效的参数！
 *        404:
 *          description: 查询不到！
 * */

router.post("/login", expressJoi(loginReg), userHandler.login)

module.exports = router
