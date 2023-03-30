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

const inquirySchema = Joi.object({
    fName: Joi.string().trim().required(),
    lName: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    mobileNo: Joi.string().trim().min(10).max(10).required(),
    message: Joi.string().trim().max(3000).required(),
    status: Joi.boolean()
});

const replyInquirySchema = Joi.object({
    inquiryId: Joi.string().trim().required(),
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
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    pincode: Joi.number().required(),
    image: Joi.allow(null),
});

const searchDoctorSchema = Joi.object({
    name: Joi.string().allow(null).trim().empty(''),
    department: Joi.string().allow(null).trim()
})

const searchDepartmentSchema = Joi.object({
    name: Joi.string().trim().empty(''),
})

const addAppointmentSchema = Joi.object({
    patient: Joi.string().required(),
    doctor: Joi.string().required(),
    description: Joi.string(),
    appointmentDate: Joi.date().required(),
    appointmentTime: Joi.string().required()
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
    name: Joi.string().trim().empty(''),
    state: Joi.string().allow(null),
    city: Joi.string().allow(null),
})

const addDepartmentSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.boolean().required(),
})


const backupDoctorsSchema = Joi.object({
    dateTo: Joi.string().trim().empty(''),
    dateFrom: Joi.string().trim().empty(''),
})

const backupPatientsSchema = Joi.object({
    dateTo: Joi.string().trim().empty(''),
    dateFrom: Joi.string().trim().empty(''),
    
const addPrescriptionSchema = Joi.object({
    patient: Joi.string().required(),
    doctor: Joi.string().required(),
    medicines: Joi.array().required(),
    description: Joi.string().required(),
    nextAppointmentDate: Joi.date().required(),
    
})

module.exports = {
    authSchema,
    signupSchema,
    sendOtpSchema,
    recoverPasswordSchema,
    inquirySchema,
    replyInquirySchema,
    addDoctorSchema,
    searchDoctorSchema,
    addAppointmentSchema,
    newsletterSchema,
    addHospitalSchema,
    searchHospitalSchema,
    addDepartmentSchema,
    searchDepartmentSchema,
    backupDoctorsSchema,
    backupPatientsSchema
    addPrescriptionSchema
};