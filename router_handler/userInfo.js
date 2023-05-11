const { PrismaClient } = require("@prisma/client")
const { log } = require("console")
const prisma = new PrismaClient()

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
}

const updateUserInfo = (req, res) => {
    const user = req.body
    const query = async () => {
        const result = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                username: user.username
            }
        })
        // log(11,result)
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
    query()
}

module.exports = {
    getUserInfo,
    updateUserInfo
}
