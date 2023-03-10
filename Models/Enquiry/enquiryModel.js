const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
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
    type: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema, "Enquiries");