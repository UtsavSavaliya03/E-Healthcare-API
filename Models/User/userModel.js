const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Please fill your password"],
    },
    role: {
        type: Number,
        default: 2,
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