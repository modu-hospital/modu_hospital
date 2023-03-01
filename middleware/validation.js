const { string } = require('joi');
const Joi = require('joi');

const sighupValidation = Joi.object({
    name: Joi.string().not('').min(1).required(),
    phone: Joi.string().not('').required(),
    loginId: Joi.string().not('').min(3).required(),
    password: Joi.string().not('').min(3).required(),
    confirm: Joi.equal(Joi.ref('password')).required().messages({
        'any.only': '비밀번호가 일치하지 않습니다.',
    }),
    idNumber: Joi.string().not('').min(14).required(),
});

const reservationDateUpdateValidation = Joi.object({
    date: Joi.date().greater('2023-03-01').required(),
});

const reservationStatusUpdateValidation = Joi.object({
    status: Joi.string().not('').min(4).required(),
});

const doctoerIdValidateSchema = Joi.number().required();

const reservationWaitingGetValidation = Joi.string().required();

const hospitalRegisterValidateSchema = Joi.object({
    userId: Joi.number().required(),
    name: Joi.string().min(3).max(20).required(),
    address: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(7)
        .max(16)
        .required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
});

module.exports = {
    sighupValidation,
    reservationDateUpdateValidation,
    reservationStatusUpdateValidation,
    reservationWaitingGetValidation,
    doctoerIdValidateSchema,
    hospitalRegisterValidateSchema,
};
