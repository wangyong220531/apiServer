const prisma = require("../script")

exports.register = (req, res) => {
    const userInfo = req.body
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            success: false,
            msg: "用户名或密码不能为空！"
        })
    }
    async function test(){
        const res = await prisma.users.create()
    }
    res.send({
        code: 200,
        success: true,
        msg: "注册成功！"
    })
}

exports.login = (req, res) => {
    res.send({
        code: 200,
        success: true,
        msg: "登录成功！"
    })
}
