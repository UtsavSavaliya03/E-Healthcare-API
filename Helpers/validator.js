const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(20).required(),
});

const signupSchema = Joi.object({
    fName: Joi.string().trim().required(),
    lName: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    mobileNo: Joi.string().trim().min(10).max(10).required(),
    password: Joi.string().trim().min(8).max(20).required(),
    confirmPassword: Joi.string().trim().min(8).max(20).valid(Joi.ref('password')).required(),
});

const sendOtpSchema = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
});

const recoverPasswordSchema = Joi.object({
    userId: Joi.string().trim().required(),
    otp: Joi.string().min(6).max(6).trim().required(),
    password: Joi.string().trim().min(8).max(20).required(),
    confirmPassword: Joi.string().trim().min(8).max(20).valid(Joi.ref('password')).required(),
});

const enquirySchema = Joi.object({
    fName: Joi.string().trim(),
    lName: Joi.string().trim(),
    email: Joi.string().email().trim(),
    mobileNo: Joi.string().trim().min(10).max(10),
    message: Joi.string().trim().max(300),
    type: Joi.string().uppercase().trim(),
    status: Joi.boolean()
});

const replyEnquirySchema = Joi.object({
    enquiryId: Joi.string().trim().required(),
    reply: Joi.string().trim().required(),
})

module.exports = {
    authSchema,
    signupSchema,
    sendOtpSchema,
    recoverPasswordSchema,
    enquirySchema,
    replyEnquirySchema,
};