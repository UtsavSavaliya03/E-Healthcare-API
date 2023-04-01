const Department = require('../Models/Department/departmentModel.js');
const Doctor = require('../Models/Doctor/doctorModel.js');
const { addDepartmentSchema, searchDepartmentSchema } = require('../Helpers/validator.js');

exports.addDepartment = async (req, res, next) => {
    try {
        const validateResult = await addDepartmentSchema.validateAsync(req.body);

        const isDepartmentExist = await Department.findOne({ name: validateResult?.name })

        if (isDepartmentExist !== null) {
            return res.status(400).json({
                status: false,
                message: "Department with this name is already exist, try with another name...!"
            })
        } else {
            const hospital = await Department.create({
                name: validateResult?.name,
                description: validateResult?.description,
                status: validateResult?.status,
            })
            res.status(201).json({
                status: true,
                message: "Department added successfully...!",
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

exports.fetchDepartments = async (req, res) => {
    try {
        departmentsDetails = await Department.find({ status: true }).sort({ name: 1 })
        res.status(200).json({
            status: true,
            department: departmentsDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.fetchDepartmentById = async (req, res) => {
    try {
        let doctors = await Doctor.find({ department: req.params.id }).sort({ fName: 1, lName: 1 });
        await Department.findById(req.params.id)
            .then((result) => {
                return (
                    res.status(200).json({
                        status: true,
                        data: { department: result, doctors: doctors }
                    })
                )
            })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Department's information does exist...!"
        })
    }
}

exports.searchDepartment = async (req, res) => {
    try {
        const validateResult = await searchDepartmentSchema.validateAsync(req.body);

        var regexName = new RegExp(validateResult?.name, 'i');

        const response = await Department.find({ name: regexName }).sort({ name: 1 });

        res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.deleteDepartment = async (req, res) => {
    try {
        const _id = req.params.id;

        await Department.findOne({ _id })

        const doctor = await Doctor.find({ department: _id });

        if (doctor?.length > 0) {
            res.status(401).json({
                status: false,
                message: "Sorry, Some doctors are exist in this department...!",
            })
        } else {
            await Department.findByIdAndDelete({ _id })
            res.status(200).json({
                status: true,
                message: "Doctor's detail deleted successfully...!",
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Doctor's information does not exist...!"
        })
    }
}