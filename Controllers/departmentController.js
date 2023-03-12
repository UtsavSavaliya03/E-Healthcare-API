const { departmentSchema } = require("../Helpers/validator.js")
const Department = require("../Models/Department/departmentModel.js")

exports.addDepartment = async (req, res, next) => {
    try {
        const validateResult = await departmentSchema.validateAsync(req.body);
        const department = await Department.create({
            departmentName: validateResult?.departmentName,
            description: validateResult?.description
        })

        res.status(201).json({
            status: true,
            message: "Department Added successfully...!",
            data: department._id,
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

exports.fetchDepartments = async (req, res) => {
    try {
        departmentDetails = await Department.find()
        res.status(200).json({
            status: true,
            data: departmentDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.deleteDepartment = async (req, res) => {
    try {
        const _id = req.params.id;

        await Department.findByIdAndDelete({ _id })
        res.status(200).json({
            status: true,
            message: "Department's detail deleted successfully...!",
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"

        })
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const _id = req.params.id;

        await Department.findByIdAndUpdate({ _id }, req.body)

        return res.status(200).json({
            status: true,
            message: "Department's information updated successfully...!"
        })


    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"

        })
    }
}