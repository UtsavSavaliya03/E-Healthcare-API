const mongoose = require("mongoose")

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required:true
    }
},{timestamps:true})

module.exports = new mongoose.model("Newsletter", newsletterSchema, "Newsletters")