const Doctor = require("../Models/Doctor/doctorModel.js")
const { addDoctorSchema } = require("../Helpers/validator.js");

exports.addDoctor = async (req, res) => {
    try {
        const validateResult = await addDoctorSchema.validateAsync(req.body);

        const isDoctorExist = await Doctor.findOne({ email: validateResult?.email })

        if (isDoctorExist !== null) {
            return res.status(400).json({
                status: false,
                message: "Doctor already exist...!"
            })
        } else {
            const doctor = await Doctor.create({
                fName: validateResult?.fName,
                lName: validateResult?.lName,
                dateOfBirth: validateResult?.dateOfBirth,
                email: validateResult?.email,
                mobileNo: validateResult?.mobileNo,
                bloodGroup: validateResult?.bloodGroup,
                gender: validateResult?.gender,
                shortBio: validateResult?.shortBio,
                experience: validateResult?.experience,
                department: validateResult?.department,
                addressLine: validateResult?.addressLine,
                city: validateResult?.city,
                state: validateResult?.state,
                pincode: validateResult?.pincode,
                country: validateResult?.country,
            })
            res.status(201).json({
                status: true,
                message: "Doctor Added Successfully...!",
                data: doctor._id,
            });
        }
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

exports.fetchDoctors = async (req, res) => {
    try {
        doctorsDetails = await Doctor.find()
        res.status(200).json({
            status: true,
            data: doctorsDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.deleteDoctor = async (req, res) => {
    try {
        const _id = req.params.id;

        await Doctor.findOne({ _id })

        await Doctor.findByIdAndDelete({ _id })
        res.status(200).json({
            status: true,
            message: "Doctor's Detail Deleted Successfully...!",
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Doctor's Information Does exist...!"
        })
    }
}

exports.updateDoctor = async (req, res) => {
    try {
        const _id = req.params.id;

        data = await Doctor.findOne({ _id })

        await Doctor.findByIdAndUpdate({ _id }, req.body)

        return res.status(200).json({
            status: true,
            message: "Doctor's Information Updated Successfully...!"
        })


    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Doctor's Information Does exist...!"
        })
    }
}