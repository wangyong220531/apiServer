const joi = require("joi")

const name = joi.string().min(5).max(20).required()

exports.reg_arctile = {
    body: {
        name,
        alias: name
    }
}
