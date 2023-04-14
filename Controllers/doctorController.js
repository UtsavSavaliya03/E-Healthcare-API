const Doctor = require("../Models/Doctor/doctorModel.js");
const Laboratory = require("../Models/Laboratory/laboratoryModel.js");
const User = require("../Models/User/userModel.js");
const { addDoctorSchema, searchDoctorSchema } = require("../Helpers/validator.js");
const nodeMailer = require('../Services/NodeMailer.js');
const CloudinaryService = require('../Services/CloudinaryServices.js');
const generatePassword = require('../Services/GeneratePassword.js');
const bcrypt = require('bcrypt');

exports.addDoctor = async (req, res, next) => {
    try {
        const validateResult = await addDoctorSchema.validateAsync(req.body);

        const isDoctorExist = await Doctor.findOne({ email: validateResult?.email })
        const isUserExist = await User.findOne({ email: validateResult?.email })
        const isLaboratoryExist = await Laboratory.findOne({ email: validateResult?.email })

        if (isDoctorExist !== null || isUserExist !== null || isLaboratoryExist !== null) {
            return res.status(400).json({
                status: false,
                message: "Doctor already exist, try with another email address...!"
            })
        } else {

            let profileImg;
            if (req?.files !== null) {
                profileImg = await CloudinaryService(req?.files?.image);
            }
            let password = await generatePassword();
            let encryptedPassword = await bcrypt.hash(password, 10);

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
                country: JSON.parse(validateResult?.country),
                state: JSON.parse(validateResult?.state),
                city: JSON.parse(validateResult?.city),
                password: encryptedPassword,
                pincode: validateResult?.pincode,
                profileImg: profileImg?.url
            })

            const name = doctor?.fName + ' ' + doctor?.lName;
            const header = `New Beginnings: Welcome ${name} to Health Horizon!`;
            nodeMailer('WelcomeDoctor', doctor?.email, header, name, { email: doctor?.email, password: password });

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
        doctorsDetails = await Doctor.find({}, {password: 0}).sort({ fName: 1, lName: 1 }).populate('hospital department')
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

exports.searchDoctor = async (req, res) => {
    try {
        const validateResult = await searchDoctorSchema.validateAsync(req.body);

        const doctors = await Doctor.find().sort({ fName: 1, lName: 1 }).populate('hospital department');

        let filteredUsers = doctors.filter(user => {
            let isValid = true;
            for (key in validateResult) {
                if (key == 'city') {
                    isValid = isValid && user[key]?.name == validateResult[key];
                } else if (key == 'state') {
                    isValid = isValid && user[key].isoCode == validateResult[key];
                } else if (key == 'department') {
                    isValid = isValid && user[key]._id == validateResult[key];
                } else {
                    isValid = isValid && (user[key]).toString().includes(validateResult[key]);
                }
            }
            return isValid;
        });
        
        res.status(200).json({
            status: true,
            data: filteredUsers,
        });
    } catch (error) {
        console.log('Error, while searching doctors: ', error);
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        }
        return (
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        )
    }
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
            message: "Doctor's information does not exist...!"
        })
    }
}

exports.updateDoctor = async (req, res) => {
    try {
        if (req?.files !== null) {
            let profileImg = await CloudinaryService(req?.files?.image);

            await Doctor.findByIdAndUpdate(req.params.id,
                {
                    $set: {
                        fName: req.body?.fName,
                        lName: req.body?.lName,
                        dateOfBirth: req.body?.dateOfBirth,
                        email: req.body?.email,
                        mobileNo: req.body?.mobileNo,
                        bloodGroup: req.body?.bloodGroup,
                        gender: req.body?.gender,
                        shortBio: req.body?.shortBio,
                        experience: req.body?.experience,
                        department: req.body?.department,
                        hospital: req.body?.hospital,
                        addressLine: req.body?.addressLine,
                        country: JSON.parse(req.body?.country),
                        state: JSON.parse(req.body?.state),
                        city: JSON.parse(req.body?.city),
                        pincode: req.body?.pincode,
                        profileImg: profileImg?.url
                    }
                },
                { new: true }).populate('hospital department')
                .then((result) => {
                    return (
                        res.status(200).json({
                            status: true,
                            message: "Doctor's Information Updated Successfully...!",
                            data: result
                        })
                    )
                })
        } else {
            await Doctor.findByIdAndUpdate(req.params.id,
                {
                    $set: {
                        profileImg: null,
                        fName: req.body?.fName,
                        lName: req.body?.lName,
                        dateOfBirth: req.body?.dateOfBirth,
                        email: req.body?.email,
                        mobileNo: req.body?.mobileNo,
                        bloodGroup: req.body?.bloodGroup,
                        gender: req.body?.gender,
                        shortBio: req.body?.shortBio,
                        experience: req.body?.experience,
                        department: req.body?.department,
                        hospital: req.body?.hospital,
                        addressLine: req.body?.addressLine,
                        country: JSON.parse(req.body?.country),
                        state: JSON.parse(req.body?.state),
                        city: JSON.parse(req.body?.city),
                        pincode: req.body?.pincode,
                    }
                },
                { new: true }).populate('hospital department')
                .then((result) => {
                    return (
                        res.status(200).json({
                            status: true,
                            message: "Doctor's Information Updated Successfully...!",
                            data: result
                        })
                    )
                })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            message: "Doctor's Information Does not exist...!"
        })
    }
}