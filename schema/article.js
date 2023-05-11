const joi = require("joi")

const id = joi.number().integer().min(1)
const name = joi.string().min(5).max(20).required()

exports.reg_arctile = {
    body: {
        name,
        alias: name
    }
}

exports.reg_speciArc = {
    params: {
        id
    }
}
