const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const userRouter = require("./router/user")
app.use("/api", userRouter)

app.listen(1010, () => {
    console.log("Express服务正在运行在http://127.0.0.1:1010上")
})
