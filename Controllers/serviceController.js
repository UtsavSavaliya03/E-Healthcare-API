const TestReports = require('../Models/TestReport/testReportModel.js');
const Appointment = require("../Models/Appointment/appointmentModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");
const Hospital = require("../Models/Hospital/hospitalModel.js");
const Laboratory = require("../Models/Laboratory/laboratoryModel.js");
const User = require("../Models/User/userModel.js");
var ObjectId = require('mongodb').ObjectID;

exports.totalReportOflaboratory = async (req, res, next) => {
    try {
        const monthStrings = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const totalReports = await TestReports.count({ laboratory: req.params.id });
        const reportsData = await TestReports.aggregate([
            {
                $match: {
                    // Match only reports with a specific laboratory id
                    laboratory: ObjectId(req.params.id),
                }
            },
            {
                $group: {
                    // Group by both month and year of the sale
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of sales
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort reports
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    x: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    y: '$count',
                }
            },
        ])

        return (
            res.status(200).json({
                status: true,
                data: {
                    reportsData: reportsData,
                    totalRecords: totalReports
                },
            })
        )

    } catch (error) {
        return (
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        )
    }
}
exports.totalPatientsOfDoctor = async (req, res, next) => {
    try {
        const monthStrings = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const totalAppointments = await Appointment.count({ doctor: req.params.id });
        const totalConsultedPatient = await Appointment.count({ $and: [{ doctor: req.params.id }, { status: 2 }] });

        const totalAppointmentsData = await Appointment.aggregate([
            {
                $match: {
                    // Match appointments with a specific doctor id
                    doctor: ObjectId(req.params.id),
                }
            },
            {
                $group: {
                    // Group by both month and year of the sale
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of appointments
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort appointments
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    x: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    y: '$count',
                }
            },
        ])
        const totalConsultedPatientData = await Appointment.aggregate([
            {
                $match: {
                    // Match patients with a specific doctor id and status
                    $expr: { $and: [{ doctor: req.params.id }, { status: 2 }] }
                }
            },
            {
                $group: {
                    // Group by both month and year of the appointments
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of appointments
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort appointments
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    x: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    y: '$count',
                }
            },
        ])
        return (
            res.status(200).json({
                status: true,
                data: {
                    totalConsultedPatientData: totalConsultedPatientData,
                    totalAppointmentsData, totalAppointmentsData,
                    totalAppointments: totalAppointments,
                    totalConsultedPatient: totalConsultedPatient
                }
            })
        )

    } catch (error) {
        return (
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        )
    }
}
exports.adminDashboardData = async (req, res, next) => {
    try {
        const monthStrings = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const totalPatients = await User.count({});
        const totalDoctors = await Doctor.count({});
        const totalHospitals = await Hospital.count({});
        const totalLaboratories = await Laboratory.count({});
        const activePatients = await User.find({ role: 3, active: true })

        const doctorsData = await Doctor.aggregate([
            {
                $group: {
                    // Group by both month and year of the doctors
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of doctors
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort doctors
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    x: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    y: '$count',
                }
            },
        ])

        const patientsData = await User.aggregate([
            {
                $group: {
                    // Group by both month and year of the patients
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of patients
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort patients
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    x: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    y: '$count',
                }
            },
        ])

        const hospitalsData = await Hospital.aggregate([
            {
                $group: {
                    // Group by both month and year of the hospitals
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of hospitals
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort hospitals
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    month: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    Hospitals: '$count',
                }
            },
        ])

        const laboratoriesData = await Laboratory.aggregate([
            {
                $group: {
                    // Group by both month and year of the laboratories
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    // Count the no of laboratories
                    count: {
                        $sum: 1
                    }
                }
            },
            // Sort laboratories
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            // Adding a project here to just to format the group date better
            {
                $project: {
                    month: {
                        $concat: [
                            {
                                $arrayElemAt: [
                                    monthStrings,
                                    "$_id.month"
                                ]
                            },
                            " ",
                            { $substrBytes: ['$_id.year', 0, 128] }
                        ]
                    },
                    count: 1,
                    Laboratories: '$count',
                }
            },
        ])

        return (
            res.status(200).json({
                status: true,
                data: {
                    totalPatients: totalPatients,
                    totalHospitals: totalHospitals,
                    totalLaboratories: totalLaboratories,
                    totalDoctors: totalDoctors,
                    activePatients: activePatients,
                    doctorsData: doctorsData,
                    patientsData: patientsData,
                    hospitalsData: hospitalsData,
                    laboratoriesData: laboratoriesData
                }
            })
        )

    } catch (error) {
        return (
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        )
    }
}