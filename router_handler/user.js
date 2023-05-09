exports.register = (req, res) => {
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
