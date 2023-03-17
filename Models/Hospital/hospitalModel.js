const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
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

},
    { timestamps: true }
);

module.exports = mongoose.model("Hospital",hospitalSchema, "Hospitals");
