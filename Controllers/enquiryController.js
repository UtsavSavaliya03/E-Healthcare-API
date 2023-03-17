const Enquiry = require('../Models/Enquiry/enquiryModel.js');
const { enquirySchema, replyEnquirySchema } = require('../Helpers/validator.js');
const nodeMailer = require('../Services/NodeMailer.js');

exports.enquiry = async (req, res, next) => {
    try {

        const validateResult = await enquirySchema.validateAsync(req.body);

        await Enquiry.create({
            fName: validateResult?.fName,
            lName: validateResult?.lName,
            email: validateResult?.email,
            mobileNo: validateResult?.mobileNo,
            message: validateResult?.message,
        })
            .then((result) => {
                return (
                    res.status(201).json({
                        status: true,
                        message: "Success",
                    })
                )
            }).catch((error) => {
                console.log('Error while adding enquiry info: ', error);
                return (
                    res.status(401).json({
                        status: false,
                        message: "Something went wrong, Please try again latter...!"
                    })
                )
            })
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).json({
                status: false,
                message: error?.details[0]?.message,
            });
        }
        next(error);
    }
};

exports.fetchEnquiry = async (req, res, next) => {
    try {
        if (req.query.status == 'unread') {
            await Enquiry.find({ status: true }).sort({ createdAt: -1 })
                .then((results) => {
                    return (
                        res.status(200).json({
                            status: true,
                            data: results,
                        })
                    )
                })
        } else if (req.query.status == 'read') {
            await Enquiry.find({ status: false }).sort({ createdAt: -1 })
                .then((results) => {
                    return (
                        res.status(200).json({
                            status: true,
                            data: results,
                        })
                    )
                })
        } else {
            await Enquiry.find().sort({ createdAt: -1 })
                .then((results) => {
                    return (
                        res.status(200).json({
                            status: true,
                            data: results,
                        })
                    )
                })
        }
    } catch (error) {
        console.log('Error while adding contact info: ', error);
        return (
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        )
    }
}

exports.replyEnquiry = async (req, res, next) => {

    const validateResult = await replyEnquirySchema.validateAsync(req.body);

    try {
        await Enquiry.findOneAndUpdate({ _id: validateResult.enquiryId, status: true }, {
            $set: {
                status: false,
                reply: validateResult?.reply
            }
        }, { new: true })
            .then((results) => {
                const name = results.fName + ' ' + results.lName;
                const header = validateResult?.header;
                nodeMailer('EnquiryResponse', results.email, header, name, validateResult?.reply);
                return (
                    res.status(200).json({
                        status: true,
                        message: 'Response sent Successfully.',
                    })
                )
            })
            .catch((error) => {
                console.log('Error while reply enquiry: ', error)
            })
    } catch (error) {
        console.log('Error while adding contact info: ', error);
        next(error)
        return (
            res.status(401).json({
                status: false,
                message: "Something went wrong, Please try again latter...!"
            })
        )
    }
}