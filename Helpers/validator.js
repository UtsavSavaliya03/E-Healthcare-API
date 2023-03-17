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
    fName: Joi.string().trim().required(),
    lName: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    mobileNo: Joi.string().trim().min(10).max(10).required(),
    message: Joi.string().trim().max(300).required(),
    status: Joi.boolean()
});

const replyEnquirySchema = Joi.object({
    enquiryId: Joi.string().trim().required(),
    header: Joi.string().trim().required(),
    reply: Joi.string().trim().required(),
})

const addDoctorSchema = Joi.object({
    fName: Joi.string().trim().required(),
    lName: Joi.string().trim().required(),
    dateOfBirth: Joi.date().required(),
    email: Joi.string().email().trim().required(),
    mobileNo: Joi.string().trim().min(10).max(10).required(),
    bloodGroup: Joi.string().trim().required(),
    gender: Joi.string().required(),
    shortBio: Joi.string().trim().required(),
    experience: Joi.number().required(),
    department: Joi.string().required(),
    hospital: Joi.string().required(),
    addressLine: Joi.string().required(),
    country: Joi.object().required(),
    state: Joi.object(),
    city: Joi.object(),
    pincode: Joi.number().required(),
});

const addAppointmentSchema = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNo: Joi.string().required(),
    appointmentDate: Joi.date().required(),
    department: Joi.string().trim().required(),
    problem: Joi.string().trim().required(),
})

const newsletterSchema = Joi.object({
    email: Joi.string().email().required(),
})

const addHospitalSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    mobileNo: Joi.string().trim().min(10).max(10).required(),
    shortBio: Joi.string().trim().required(),
    addressLine: Joi.string().required(),
    state: Joi.object(),
    city: Joi.object(),
})

const searchHospitalSchema = Joi.object({
    name: Joi.string().trim(),
    state: Joi.object(),
    city: Joi.object(),
})

const addDepartmentSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.boolean().required(),
})

module.exports = {
    authSchema,
    signupSchema,
    sendOtpSchema,
    recoverPasswordSchema,
    enquirySchema,
    replyEnquirySchema,
    addDoctorSchema,
    addAppointmentSchema,
    newsletterSchema,
    addHospitalSchema,
    searchHospitalSchema,
    addDepartmentSchema
};