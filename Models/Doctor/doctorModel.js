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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'
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
    country: {
        type: Object,
        required: true
    },
    profileImg: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
    },
    token: {
        type: String,
    },
    role: {
        type: Number,
        default: 1
    },
    active: {
        type: Boolean,
        default: true,
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema, "Doctors");
