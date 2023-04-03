const { addPrescriptionSchema } = require("../Helpers/validator.js")
const Prescription = require("../Models/Prescription/prescriptionModel.js")

exports.addPrescription = async (req, res, next) => {
    try {
        const validateResult = await addPrescriptionSchema.validateAsync(req.body);
        const prescription = await Prescription.create({
            patient: validateResult?.patient,
            doctor: validateResult?.doctor,
            medicines: validateResult?.medicines,
            suggestion: validateResult?.suggestion,
            nextVisitDate: validateResult?.nextVisitDate,
        })

        res.status(201).json({
            status: true,
            message: "Prescription generated successfully...!",
            data: prescription._id,
        });

    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        }
        next(error);
    }
}

exports.fetchPrescriptions = async (req, res) => {
    try {
        prescriptionDetails = await Prescription.find({})

        res.status(200).json({
            status: true,
            data: prescriptionDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.fetchIndividualPrescriptions = async (req, res) => {
    try {
        const _id = req.params.id

        if ((patientPrescriptions = await Prescription.find({ patient: _id }).populate('doctor',"fName lName email mobileNo hospital")).length !== 0) {

            res.status(200).json({
                status: true,
                data: patientPrescriptions
            })
        } else {

            doctorPrescriptions = await Prescription.find({ doctor: _id }).populate("patient","fName lName email mobileNo patientId")
            res.status(200).json({
                status: true,
                data: doctorPrescriptions
            })
        }

    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

