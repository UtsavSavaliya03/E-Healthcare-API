const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    mobileNo: {
        type: String,
        trim: true,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true

    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema, "Appointments");
