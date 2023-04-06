const { addPrescriptionSchema } = require("../Helpers/validator.js");
const Prescription = require("../Models/Prescription/prescriptionModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");

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
        // fetch by patients
        if ((patientPrescriptions = await Prescription.find({ patient: _id }).sort({ createdAt: -1 }).populate('doctor', "fName lName email mobileNo hospital")).length !== 0) {
            res.status(200).json({
                status: true,
                data: patientPrescriptions
            })
        } else {
            // fetch by doctor
            doctorPrescriptions = await Prescription.find({ doctor: _id }).sort({ createdAt: 1 }).populate("patient", "fName lName email mobileNo patientId age addressLine")

            let responseData = [];
            let counter = 0;
            doctorPrescriptions?.map(async (prescription) => {
                const doctor = await Doctor.findById(prescription?.doctor, { fName: 1, lName: 1, email: 1, mobileNo: 1, hospital: 1, department: 1 }).populate('hospital', 'name email mobileNo addressLine city state').populate('department', 'name')
                responseData.push({ patient: prescription?.patient, doctor: doctor, prescription: { medicines: prescription?.medicines, suggestion: prescription?.suggestion, nextVisitDate: prescription?.nextVisitDate, createdAt: prescription?.createdAt, _id: prescription?._id } })

                if (++counter === doctorPrescriptions?.length) {
                    res.status(200).json({
                        status: true,
                        data: responseData
                    })
                }
            })


        }

    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

