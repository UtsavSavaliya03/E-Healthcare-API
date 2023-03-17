const Hospital = require('../Models/Hospital/hospitalModel.js');
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

exports.searchHospitals = async (req, res) => {
    try {
        const validateResult = await searchHospitalSchema.validateAsync(req.body);

        var regexHopital = new RegExp(validateResult.hospital, 'i');

        hospitalsDetails = await Hospital.find({$or: [{name : regexHopital}, {'state.name': validateResult?.state?.name}, {'city.name': validateResult?.city?.name}]}).sort({ createdAt: -1 })
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