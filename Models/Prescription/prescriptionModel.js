const { array } = require("joi");
const mongoose = require("mongoose")

const prescriptionSchema = new mongoose.Schema({
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
    medicines: {
        type: Array
    },
    suggestion: {
        type: String,
    },
    nextVisitDate: {
        type: Date,
    }

}, { timestamps: true })

module.exports = mongoose.model("Prescription", prescriptionSchema, "Prescriptions");
