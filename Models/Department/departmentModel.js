const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Object,
        required: true,
        default: true
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema, "Departments");
