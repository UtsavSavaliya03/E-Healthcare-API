const mongoose = require("mongoose");

const laboratorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
    },
    mobileNo: {
        type: String,
        trim: true,
        required: true
    },
    shortBio: {
        type: String,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    state: {
        type: Object,
        required: true
    },
    city: {
        type: Object,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        default: 2
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Laboratory", laboratorySchema, "Laboratories");