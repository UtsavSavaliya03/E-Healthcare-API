const Hospital = require('../Models/Hospital/hospitalModel.js');
const Doctor = require('../Models/Doctor/doctorModel.js');
const { addHospitalSchema, searchHospitalSchema } = require('../Helpers/validator.js');

exports.addHospital = async (req, res, next) => {
    try {
        const validateResult = await addHospitalSchema.validateAsync(req.body);

        const isHospitalExist = await Hospital.findOne({ email: validateResult?.email })

        if (isHospitalExist !== null) {
            return res.status(400).json({
                status: false,
                message: "Hospital with this email address is already exist, try with another email address...!"
            })
        } else {
            const hospital = await Hospital.create({
                name: validateResult?.name,
                email: validateResult?.email,
                mobileNo: validateResult?.mobileNo,
                shortBio: validateResult?.shortBio,
                addressLine: validateResult?.addressLine,
                city: validateResult?.city,
                state: validateResult?.state,
            })
            res.status(201).json({
                status: true,
                message: "Hospital added successfully...!",
                data: hospital._id,
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

exports.fetchHospitals = async (req, res) => {
    try {
        hospitalsDetails = await Hospital.find().sort({ createdAt: -1 })
        res.status(200).json({
            status: true,
            hospital: hospitalsDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.fetchHospitalById = async (req, res) => {
    try {
        let doctors = await Doctor.find({ hospital: req.params.id });
        await Hospital.findById(req.params.id)
            .then((result) => {
                return (
                    res.status(200).json({
                        status: true,
                        data: { ...result, doctors: doctors }
                    })
                )
            })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Hospital's information does exist...!"
        })
    }
}

exports.searchHospitals = async (req, res) => {
    try {
        const validateResult = await searchHospitalSchema.validateAsync(req.body);

        var regexHopital = new RegExp(validateResult.name, 'i');

        if (validateResult?.state && validateResult?.city === null) {
            hospitalsDetails = await Hospital.find({ $and: [{ name: regexHopital }, { 'state.isoCode': validateResult?.state }] }).sort({ createdAt: -1 })
        } else if (validateResult?.state && validateResult?.city) {
            hospitalsDetails = await Hospital.find({ $and: [{ name: regexHopital }, { 'state.isoCode': validateResult?.state }, { 'city.name': validateResult?.city }] }).sort({ createdAt: -1 })
        } else {
            hospitalsDetails = await Hospital.find({ name: regexHopital }).sort({ createdAt: -1 })
        }

        res.status(200).json({
            status: true,
            data: hospitalsDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}