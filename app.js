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
app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api/] }))

const userRouter = require("./router/user")
app.use("/api", userRouter)

const userInfo = require("./router/userInfo")
app.use("/my", userInfo)

const userArticle = require("./router/article")
app.use("/my", userArticle)

const userGrade = require("./router/grade")
app.use("/my", userGrade)

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败！")
    err instanceof joi.ValidationError ? res.cc(err) : res.cc(err)
})

app.listen(1010, () => {
    console.log("Express服务正在运行在http://127.0.0.1:1010上")
})
