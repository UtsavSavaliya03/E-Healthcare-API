const mongoose = require("mongoose")

const testRequestSchema = new mongoose.Schema({
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
    status: {
        /* ------- (0 - PENDING), (1 - APPROVED), (2 - COMPLETED), (3 - CANCELLED) ------- */
        type: Number,
        default: 0,
    },

},{ timestamps: true })

module.exports = mongoose.model("TestRequest", testRequestSchema, "TestRequests");