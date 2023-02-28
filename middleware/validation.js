const Joi = require('joi')

const sighupValidation = Joi.object({
    name: Joi.string().not("").min(1).required(),
    phone: Joi.string().not("").required(),
    loginId: Joi.string().not("").min(3).required(),
    password: Joi.string().not("").min(3).required(),
    confirm: Joi.equal(Joi.ref('password')).required().messages({
        'any.only': '비밀번호가 일치하지 않습니다.',
    }),
    idNumber: Joi.string().not("").min(14).required()
})

module.exports ={
    sighupValidation
}