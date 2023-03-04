const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("OTP", otpSchema, "OTP");