const Hospital = require("../Models/Hospital/hospitalModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");
const Patient = require("../Models/User/userModel.js");
const Laboratory = require("../Models/Laboratory/laboratoryModel.js");
const { backupSchema } = require('../Helpers/validator.js');

exports.hospitals = async (req, res, next) => {
    try {

        const validateResult = await backupSchema.validateAsync(req.body);

        const startDate = new Date(validateResult?.dateFrom);
        const endDate = new Date(validateResult?.dateTo).setHours(23, 59, 59);

        Hospital.find({ createdAt: { $gte: startDate, $lte: endDate } })
            .then((results) => {
                res.status(200).json({
                    status: true,
                    data: results
                })
            })

    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        }
        next(error);
    }
}

exports.doctors = async (req, res, next) => {
    try {

        const validateResult = await backupSchema.validateAsync(req.body);

        const startDate = new Date(validateResult?.dateFrom);
        const endDate = new Date(validateResult?.dateTo).setHours(23, 59, 59);

        Doctor.find({ createdAt: { $gte: startDate, $lte: endDate } })
            .then((results) => {
                res.status(200).json({
                    status: true,
                    data: results
                })
            })

    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        }
        next(error);
    }
}

exports.laboratories = async (req, res, next) => {
    try {

        const validateResult = await backupSchema.validateAsync(req.body);

        const startDate = new Date(validateResult?.dateFrom);
        const endDate = new Date(validateResult?.dateTo).setHours(23, 59, 59);

        Laboratory.find({ createdAt: { $gte: startDate, $lte: endDate } })
            .then((results) => {
                res.status(200).json({
                    status: true,
                    data: results
                })
            })

    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        }
        next(error);
    }
}

exports.patients = async (req, res, next) => {
    try {

        const validateResult = await backupSchema.validateAsync(req.body);

        const startDate = new Date(validateResult?.dateFrom);
        const endDate = new Date(validateResult?.dateTo).setHours(23, 59, 59);

        Patient.find({ $and: [{ role: 2 }, { createdAt: { $gte: startDate, $lte: endDate } }] })
            .then((results) => {
                res.status(200).json({
                    status: true,
                    data: results
                })
            })

    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        }
        next(error);
    }
}
