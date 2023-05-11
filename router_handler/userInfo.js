const { PrismaClient } = require("@prisma/client")
const { log } = require("console")
const prisma = new PrismaClient()
const bcryptjs = require("bcryptjs")
const config = require("../config")

const getUserInfo = (req, res) => {
    const user = req.user
    const query = async () => {
        const result = await prisma.users.findMany({
            where: {
                id: user.id
            }
        })
        if (result.length === 1) {
            delete result[0].password
            return res.send({
                status: 0,
                success: true,
                msg: "获取用户信息成功！",
                data: result[0]
            })
        }
        return res.send({
            status: 0,
            success: true,
            msg: "获取用户信息失败！"
        })
    }
    query()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            await prisma.$disconnect()
            process.exit(1)
        })
}

const updateUserInfo = (req, res) => {
    const user = req.body
    const update = async () => {
        const result = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                username: user.username
            }
        })
        if (result) {
            delete result.password
            return res.send({
                status: 0,
                success: true,
                msg: "更新用户信息成功！",
                data: result
            })
        }
        return res.send({
            status: 0,
            success: true,
            msg: "更新用户信息失败！"
        })
    }
    const query = async () => {
        const result = await prisma.users.findUnique({
            where: {
                id: user.id
            }
        })
        result
            ? update()
            : res.send({
                  status: 1,
                  success: false,
                  msg: "查询不到该用户！"
              })
    }
    query()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            await prisma.$disconnect()
            process.exit(1)
        })
}

const updatePwd = (req, res) => {
    const user = req.body
    const update = async () => {
        const result = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                password: bcryptjs.hashSync(user.newPwd)
            }
        })
        if (result) {
            return res.send({
                status: 0,
                success: true,
                msg: "更新密码成功！"
            })
        }
        return res.send({
            status: 0,
            success: true,
            msg: "更新密码失败！"
        })
    }
    const query = async () => {
        const result = await prisma.users.findUnique({
            where: {
                id: user.id
            }
        })
        if (result) {
            const compareResult = bcryptjs.compareSync(user.oldPwd, result.password)
            compareResult
                ? update()
                : res.send({
                      status: 1,
                      success: false,
                      msg: "旧密码错误！"
                  })
            return
        }
        res.send({
            status: 1,
            success: false,
            msg: "查询不到该用户！"
        })
    }
    query()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            await prisma.$disconnect()
            process.exit(1)
        })
}

module.exports = {
    getUserInfo,
    updateUserInfo,
    updatePwd
}
