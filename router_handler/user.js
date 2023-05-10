const { PrismaClient } = require("@prisma/client")
const { log } = require("console")
const prisma = new PrismaClient()

const register = (req, res) => {
    const userInfo = req.body
    query = async () => {
        const res = await prisma.users.create({
            data: {
                username: userInfo.username,
                password: userInfo.password,
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
    query = async () => {
        const result = await prisma.users.findMany({
            where: {
                username: userInfo.username
            }
        })
        console.dir(result, { depth: null })
        result.length === 1
            ? res.send({
                  code: 200,
                  success: true,
                  msg: "登录成功！"
              })
            : res.send({
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
