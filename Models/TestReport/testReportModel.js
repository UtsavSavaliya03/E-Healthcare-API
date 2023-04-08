const mongoose = require("mongoose")

const testReportSchema = new mongoose.Schema({
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
    laboratory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laboratory",
        required: true
    },
    type: {
        type: String,
        required: true
    },
    reportInformation: {
        type: Object,
        required: true
    },
  

},{ timestamps: true })

module.exports = mongoose.model("TestReport", testReportSchema, "TestReports");