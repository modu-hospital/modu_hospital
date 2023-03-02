const { string } = require('joi');
const Joi = require('joi');

class Validation {
    signupValidation = Joi.object({
        name: Joi.string().not('').min(1).required(),
        phone: Joi.string().not('').required(),
        loginId: Joi.string().not('').min(3).required(),
        password: Joi.string().not('').min(3).required(),
        confirm: Joi.equal(Joi.ref('password')).required().messages({
            'any.only': '비밀번호가 일치하지 않습니다.',
        }),
        idNumber: Joi.string().not('').min(14).required(),
    });



    reservationDateUpdateValidation = Joi.object({
        date: Joi.date().greater('2023-03-01').required(),
    });

    reservationStatusUpdateValidation = Joi.object({
        status: Joi.string().not('').min(4).required(),
    });

    doctoerIdValidateSchema = Joi.number().required();

    reservationWaitingGetValidation = Joi.string().required();

    hospitalRegisterValidateSchema = Joi.object({
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

    hospitalRegisterUpdateValidateSchema = Joi.object({
        userId: Joi.number().required(),
        name: Joi.string().min(3).max(20),
        address: Joi.string(),
        phone: Joi.string()
            .pattern(/^[0-9]+$/)
            .min(7)
            .max(16),
        longitude: Joi.number(),
        latitude: Joi.number(),
    });

    editProfile = Joi.object({
        address:Joi.string().not('').required(),
        name: Joi.string().not('').min(1).required(),
        phone: Joi.string().not('').required()
    })

    createReview = Joi.object({
        star: Joi.number().required(),
        contents: Joi.string()
    })

}

module.exports = Validation;
