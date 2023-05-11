const { PrismaClient } = require("@prisma/client")
const { log } = require("console")
const prisma = new PrismaClient()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

const register = (req, res) => {
    const userInfo = req.body
    const query = async () => {
        const res = await prisma.users.create({
            data: {
                username: userInfo.username,
                password: bcryptjs.hashSync(userInfo.password),
                nickname: userInfo.nickname,
                email: userInfo.email,
                avator: userInfo.avator
            }
        })
        console.dir(res, { depth: null })
    }
    query()
}

const login = (req, res) => {
    const userInfo = req.body
    const query = async () => {
        const result = await prisma.users.findMany({
            where: {
                username: userInfo.username
            }
        })
        console.dir(result, { depth: null })
        if (result.length === 1) {
            const user = { ...result[0], password: "" }
            const compareResult = bcryptjs.compareSync(userInfo.password, result[0].password)
            const tokenStr = jwt.sign(user, config.secretKey, { expiresIn: config.expiresIn })
            compareResult
                ? res.send({
                      code: 200,
                      success: true,
                      msg: "登录成功！",
                      token: "Bearer " + tokenStr
                  })
                : res.send({
                      code: 1,
                      success: false,
                      msg: "密码错误！"
                  })
            return
        }
        res.send({
            code: 200,
            success: true,
            msg: "登录失败！"
        })
    }
    query()
}

module.exports = {
    register,
    login
}
