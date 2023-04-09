const Hospital = require('../Models/Hospital/hospitalModel.js');
const Doctor = require('../Models/Doctor/doctorModel.js');
const { addHospitalSchema, searchHospitalSchema } = require('../Helpers/validator.js');

exports.addHospital = async (req, res, next) => {
    try {
        const validateResult = await addHospitalSchema.validateAsync(req.body);

        const isHospitalExist = await Hospital.findOne({ $or: [{ email: validateResult?.email }, { name: validateResult?.name }] })

        if (isHospitalExist !== null) {
            return res.status(400).json({
                status: false,
                message: "Hospital with this name or email address is already exist, try with another email address...!"
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
        hospitalsDetails = await Hospital.find().sort({ name: 1 })
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
        let doctors = await Doctor.find({ hospital: req.params.id }).sort({ fName: 1, lName: 1 });
        await Hospital.findById(req.params.id)
            .then((result) => {
                return (
                    res.status(200).json({
                        status: true,
                        data: { hospital: result, doctors: doctors }
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
            hospitalsDetails = await Hospital.find({ $and: [{ name: regexHopital }, { 'state.isoCode': validateResult?.state }] }).sort({ name: 1 })
        } else if (validateResult?.state && validateResult?.city) {
            hospitalsDetails = await Hospital.find({ $and: [{ name: regexHopital }, { 'state.isoCode': validateResult?.state }, { 'city.name': validateResult?.city }] }).sort({ name: 1 })
        } else {
            hospitalsDetails = await Hospital.find({ name: regexHopital }).sort({ name: 1 })
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

exports.deleteHospital = async (req, res) => {
    try {
        const _id = req.params.id;

        await Hospital.findOne({ _id })

        const doctor = await Doctor.find({ hospital: _id });

        if (doctor?.length > 0) {
            res.status(401).json({
                status: false,
                message: "Sorry, Some doctors are exist in this hospital...!",
            })
        } else {
            await Hospital.findByIdAndDelete({ _id })
            res.status(200).json({
                status: true,
                message: "Hospital's detail deleted successfully...!",
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Hospital's information does not exist...!"
        })
    }
}

exports.updateHospital = async (req, res) => {
    try {

        await Hospital.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    name: req.body?.name,
                    email: req.body?.email,
                    mobileNo: req.body?.mobileNo,
                    shortBio: req.body?.shortBio,
                    addressLine: req.body?.addressLine,
                    state: req.body?.state,
                    city: req.body?.city
                }
            },
            { new: true })
            .then((result) => {
                return (
                    res.status(200).json({
                        status: true,
                        message: "Hospital's Information Updated Successfully...!",
                        data: result
                    })
                )
            })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            message: "Hospital's Information Does not exist...!"
        })
    }
}