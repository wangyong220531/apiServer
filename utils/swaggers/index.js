const path = require("path")
const express = require("express")
const swaggerUI = require("swagger-ui-express")
const swaggerDoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "apiServer接口文档",
            version: "1.0.0",
            description: ``
        }
    },
    apis: [path.join(__dirname, "../../router/*.js")]
}

const swaggerJson = (req, res) => {
    res.send("Content-Type", "application/json")
    res.send(swaggerSpec)
}

const swaggerSpec = swaggerDoc(options)

const swaggerInstall = app => {
    if (!app) {
        app = express()
    }
    app.get("/swagger.json", swaggerJson)
    app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}

module.exports = swaggerInstall
