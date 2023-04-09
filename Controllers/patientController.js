const User = require("../Models/User/userModel.js")

exports.fetchPatients = async (req, res) => {
    try {
        const patientsDetails = await User.find({ role: 3 }).sort({ fName: 1, lName: 1 })
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

exports.searchPatients = async (req, res) => {
    try {
        var regexPatientId = new RegExp(req.params.patientId, 'i');

        const response = await User.find({ $and: [{ role: 3 }, { patientId: regexPatientId }] }).sort({ fName: 1, lName: 1 });

        res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}
