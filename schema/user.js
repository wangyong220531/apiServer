const joi = require("joi")

const id = joi.number().integer().min(1)
const username = joi.string().alphanum().min(1).max(20).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
const email = joi.string().email().required()
const avator = joi.string().dataUri().required()

exports.loginReg = {
    body: {
        id,
        username,
        password,
        email,
        avator
    }
}

exports.updateUserInfoReg = {
    body: {
        id,
        username,
        email,
        avator
    }
}

exports.updatePwd = {
    body: {
        id,
        oldPwd: password,
        newPwd: joi.not(joi.ref("oldPwd")).concat(password)
    }
}

exports.updateAvator = {
    body: {
        id,
        avator
    }
}
