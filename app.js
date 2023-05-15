const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
const joi = require("joi")

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

const expressJWT = require("express-jwt")
const config = require("./config")
app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api|\/swagger|\/test/] }))

const userRouter = require("./router/user")
app.use("/api", userRouter)

const userInfo = require("./router/userInfo")
app.use("/my", userInfo)

const userArticle = require("./router/article")
app.use("/my", userArticle)

const userGrade = require("./router/grade")
app.use("/my", userGrade)

app.get("/test", (req, res) => {
    res.send({
        code: 200,
        msg:"获取成功！",
        success: true,
        data: {
            name: "菜徐腾",
            age: "22",
            role: "刺客"
        }
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败！")
    err instanceof joi.ValidationError ? res.cc(err) : res.cc(err)
})

const swaggerInstall = require("./utils/swaggers")
swaggerInstall(app)

app.listen(1010, () => {
    console.log("Express服务正在运行在http://127.0.0.1:1010上")
})
