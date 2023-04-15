const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: [true, "Please fill your first name"],
    },
    lName: {
        type: String,
        required: [true, "Please fill your last name"],
    },
    email: {
        type: String,
        required: [true, " fill your email"],
        unique: true,
        lowercase: true
    },
    mobileNo: {
        type: String,
        trim: true,
    },
    profileImg: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    addressLine: {
        type: String
    },
    state: {
        type: Object,
    },
    city: {
        type: Object,
    },
    pincode: {
        type: Number,
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
    },
    role: {
        type: Number,
        default: 3,
    },
    token: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "Users");