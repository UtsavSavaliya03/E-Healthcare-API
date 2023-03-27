const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    fName: {
        type: String,
    },
    lName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNo: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
    },
    reply: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema, "Inquiries");