const { PrismaClient } = require("@prisma/client")
const { log, dir } = require("console")
const prisma = new PrismaClient()
const redis = require("redis")

const addGrade = (req, res) => {
    const grade = req.body
    const addGrade = async () => {
        const result = await prisma.grade.create({
            data: {
                subject: grade.subject,
                score: grade.score
            }
        })
        result
            ? res.send({
                  code: 200,
                  success: true,
                  msg: "新增成绩成功！",
                  data: result
              })
            : res.send({
                  code: 400,
                  success: false,
                  msg: "新增成绩失败！"
              })
    }
    addGrade()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async err => {
            console.log(err)
            await prisma.$disconnect()
            process.exit(1)
        })
}

const getGradeList = (req, res) => {
    const client = redis.createClient(process.env.RDS_PORT, process.env.RDS_HOST)
    client.auth(process.env.RDS_PWD, () => {
        console.log("Redis身份验证成功！")
        res.send("Redis连接成功！")
    })
    client.on("ready", () => {
        console.log("Redis已经准备好了！")
    })
    // client.on("connect", () => {
    //     client.set("姓名", "蔡徐腾", redis.print)
    //     client.get("姓名", redis.print)
    //     client.hmset("编程语言", { TS: "TypeScript", GO: "Golang" }, redis.print)
    //     client.hmset("编程语言", "SQL", "Structured Query Language", "C#", "C Sharp", redis.print)
    //     client.hgetall("编程语言", (err, res) => {
    //         if (err) {
    //             console.log("Error：" + err)
    //             return
    //         }
    //         dir(res)
    //     })
    // })

    client.on("connect", () => {
        const key = "skills"
        client.sadd(key, "Rust")
        client.sadd(key, "Python")
        client.sadd(key, "C++")

        client
            .multi()
            .sismember(key, "Rust")
            .smembers(key)
            .exec((err, replies) => {
                console.log("Replies：" + replies.length)
                replies.forEach((e, index) => {
                    console.log("Reply" + index + "：" + e.toString())
                })
                client.quit()
            })
    })
}

module.exports = {
    addGrade,
    getGradeList
}
