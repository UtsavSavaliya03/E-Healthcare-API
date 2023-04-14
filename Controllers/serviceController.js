const TestReports = require('../Models/TestReport/testReportModel.js');
var ObjectId = require('mongodb').ObjectID;

exports.totalReportOflaboratory = async (req, res, next) => {
    try {
        const monthStrings = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const totalReports = await TestReports.count({ laboratory: req.params.id });
        const reposrtData = await TestReports.aggregate([
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
                data: reposrtData,
                totalRecords: totalReports
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