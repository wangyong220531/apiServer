const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const gradeHandler = (req, res) => {
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

module.exports = {
    gradeHandler
}
