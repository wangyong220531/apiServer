const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use((req,res,next) => {
    res.cc = (err, status) => {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

const userRouter = require("./router/user")
app.use("/api", userRouter)

app.listen(1010, () => {
    console.log("Express服务正在运行在http://127.0.0.1:1010上")
})
