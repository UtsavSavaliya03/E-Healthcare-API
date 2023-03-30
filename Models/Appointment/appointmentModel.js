const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    status: {
        /* ------- (0 - PENDING), (1 - APPROVED), (2 - COMPLETED), (3 - CANCELLED) ------- */
        type: Number,
        default: 0,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema, "Appointments");
