const User = require("../Models/User/userModel.js")

exports.fetchPatients = async (req, res) => {
    try {
        const patientsDetails = await User.find({ role: 2 })
        res.status(200).json({
            status: true,
            data: patientsDetails
        })

    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}
