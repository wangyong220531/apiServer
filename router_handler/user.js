const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcryptjs = require("bcryptjs")

const register = (req, res) => {
    const userInfo = req.body
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            success: false,
            msg: "用户名或密码不能为空！"
        })
    }
    async function test() {
        const res = await prisma.users.findMany()
        console.dir(res, { depth: null })
    }
    test()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    res.send({
        code: 200,
        success: true,
        msg: "注册成功！"
    })
}

const login = (req, res) => {
    res.send({
        code: 200,
        success: true,
        msg: "登录成功！"
    })
}

module.exports = {
    register,
    login
}
