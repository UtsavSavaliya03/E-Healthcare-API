const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("Department", departmentSchema, "Departments")
