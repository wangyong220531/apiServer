const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")
const { log } = require("console")

const register = (req, res) => {
    const userInfo = req.body
    const query = async () => {
        const result = await prisma.users.create({
            data: {
                username: userInfo.username,
                password: bcryptjs.hashSync(userInfo.password),
                nickname: userInfo.nickname,
                email: userInfo.email
            }
        })
        result
            ? res.send({
                  status: 0,
                  success: true,
                  msg: "注册成功！",
                  data: result
              })
            : res.send({
                  status: 1,
                  success: false,
                  msg: "注册失败！"
              })
    }
    query()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            log(e)
            await prisma.$disconnect()
            process.exit(1)
        })
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
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            console.log(e);
            await prisma.$disconnect()
            process.exit(1)
        })
}

module.exports = {
    register,
    login
}
