const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getArticleList = (req, res) => {
    const query = async () => {
        const result = await prisma.article.findMany()
        result
            ? res.send({
                  status: 0,
                  success: true,
                  msg: "获取文章列表成功！",
                  data: result
              })
            : res.send({
                  status: 1,
                  success: false,
                  msg: "获取文章列表失败！"
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

const addArticle = (req, res) => {
    const article = req.body
    const judge = async () => {
        const result = await prisma.article.findMany({
            where: {
                name: article.name
            }
        })
        result[0]
            ? res.send({
                  status: 1,
                  success: false,
                  msg: "该文章名已被占用,请重新输入！"
              })
            : add()
    }
    const add = async () => {
        const result = await prisma.article.create({
            data: {
                name: article.name,
                alias: article.alias
            }
        })
        if (result) {
            return res.send({
                status: 0,
                success: true,
                msg: "添加文章成功！"
            })
        }
        res.send({
            status: 1,
            success: false,
            msg: "添加文章失败！"
        })
    }
    judge()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            await prisma.$disconnect()
            process.exit(1)
        })
}

const delArticle = (req, res) => {
    const update = async () => {
        const result = await prisma.article.update({
            where: {
                id: req.params
            },
            data: {
                is_delete: true
            }
        })
        result
            ? res.send({
                  status: 0,
                  success: true,
                  msg: "成功删除此文章！"
              })
            : res.send({
                  status: 1,
                  success: false,
                  msg: "此文章删除失败！"
              })
    }
    const judge = async () => {
        const result = await prisma.article.updateUnique({
            where: {
                id: req.params
            }
        })
        console.log(result);
        // result
        //     ? update()
        //     : res.send({
        //           status: 1,
        //           success: false,
        //           msg: "未查询到此文章！"
        //       })
    }
    judge()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async e => {
            await prisma.$disconnect()
            process.exit(1)
        })
}

module.exports = {
    getArticleList,
    addArticle,
    delArticle
}
