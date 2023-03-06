const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
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
    bloodGroup: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    shortBio: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema, "Doctors");
