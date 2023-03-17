const Doctor = require("../Models/Doctor/doctorModel.js")
const { addDoctorSchema } = require("../Helpers/validator.js");

exports.addDoctor = async (req, res, next) => {
    try {
        const validateResult = await addDoctorSchema.validateAsync(req.body);

        const isDoctorExist = await Doctor.findOne({ email: validateResult?.email })

        if (isDoctorExist !== null) {
            return res.status(400).json({
                status: false,
                message: "Doctor already exist, try with another email address...!"
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
                hospital: validateResult?.hospital,
                addressLine: validateResult?.addressLine,
                city: validateResult?.city,
                state: validateResult?.state,
                pincode: validateResult?.pincode,
                country: validateResult?.country,
            })
            res.status(201).json({
                status: true,
                message: "Doctor added successfully...!",
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

exports.fetchDoctorById = async (req, res) => {
    try {
        await Doctor.findById(req.params.id).populate('hospital department')
            .then((result) => {
                return (
                    res.status(200).json({
                        status: true,
                        data: result
                    })
                )
            })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Doctor's information does exist...!"
        })
    }
}

exports.fetchDoctors = async (req, res) => {
    try {
        doctorsDetails = await Doctor.find({}).sort({ createdAt: -1 }).populate('hospital department')
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

    // try {
    //     const size = (parseInt(req.query.size || 10)) * (parseInt(req.query.page || 1));
    //     const skipRecord = (parseInt(req.query.size || 10)) * (parseInt(req.query.page || 1) - 1);

    //     const allGst = await Gst.find();

    //     await Gst.find().skip(skipRecord).limit(size)
    //         .then((results) => {
    //             res.status(200).json({
    //                 gst: results,
    //                 total_page: Math.ceil(allGst.length / parseInt(req.query.size || 10))
    //             });
    //         }).catch((error) => {
    //             res.status(401).json({
    //                 status: false,
    //                 message: "Something went wrong, Please try again latter...!"
    //             })
    //         })
    // } catch (error) {
    //     console.log('Error, while fetching all gst: ', error);
    //     return (
    //         res.status(401).json({
    //             status: false,
    //             message: "Something went wrong, Please try again latter...!"
    //         })
    //     )
    // }
}

exports.searchDoctor = async (res, req) => {
    // try {
    //     const size = (parseInt(req.query.size || 10)) * (parseInt(req.query.page || 1));
    //     const skipRecord = (parseInt(req.query.size || 10)) * (parseInt(req.query.page || 1) - 1);

    //     var regexGstin = new RegExp(req.params.gstin, 'i');

    //     const allGst = await Gst.find({$or: [{ gstin: regexGstin }, { 'gstData.lgnm': regexGstin }]});
    //     const response = await Gst.find({$or: [{ gstin: regexGstin }, { 'gstData.lgnm': regexGstin }]}).skip(skipRecord).limit(size);

    //     res.status(200).json({
    //         gst: response,
    //         total_page: Math.ceil(allGst.length / parseInt(req.query.size || 10))
    //     });
    // } catch (error) {
    //     console.log('Error, while searching gst: ', error);
    //     return (
    //         res.status(401).json({
    //             status: false,
    //             message: "Something went wrong, Please try again latter...!"
    //         })
    //     )
    // }
}

exports.deleteDoctor = async (req, res) => {
    try {
        const _id = req.params.id;

        await Doctor.findOne({ _id })

        await Doctor.findByIdAndDelete({ _id })
        res.status(200).json({
            status: true,
            message: "Doctor's detail deleted successfully...!",
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Doctor's information does exist...!"
        })
    }
}

exports.updateDoctor = async (req, res) => {
    try {
        const _id = req.params.id;

        data = await Doctor.findOne({ _id })

        await Doctor.findByIdAndUpdate({ _id }, req.body, { new: true }).populate('hospital department')
            .then((result) => {
                return (
                    res.status(200).json({
                        status: true,
                        message: "Doctor's Information Updated Successfully...!",
                        data: result
                    })
                )
            })



    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Doctor's Information Does exist...!"
        })
    }
}