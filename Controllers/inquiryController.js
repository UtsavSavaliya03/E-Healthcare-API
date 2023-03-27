const Inquiry = require('../Models/Inquiry/inquiryModel.js');
const { inquirySchema, replyInquirySchema } = require('../Helpers/validator.js');
const nodeMailer = require('../Services/NodeMailer.js');

exports.inquiry = async (req, res, next) => {
    try {

        const validateResult = await inquirySchema.validateAsync(req.body);

        await Inquiry.create({
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
                console.log('Error while adding inquiry info: ', error);
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

exports.fetchInquiry = async (req, res, next) => {
    try {
        if (req.query.status == 'unread') {
            await Inquiry.find({ status: true }).sort({ createdAt: -1 })
                .then((results) => {
                    return (
                        res.status(200).json({
                            status: true,
                            data: results,
                        })
                    )
                })
        } else if (req.query.status == 'read') {
            await Inquiry.find({ status: false }).sort({ createdAt: -1 })
                .then((results) => {
                    return (
                        res.status(200).json({
                            status: true,
                            data: results,
                        })
                    )
                })
        } else {
            await Inquiry.find().sort({ createdAt: -1 })
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

exports.replyInquiry = async (req, res, next) => {

    const validateResult = await replyInquirySchema.validateAsync(req.body);

    try {
        await Inquiry.findOneAndUpdate({ _id: validateResult.inquiryId, status: true }, {
            $set: {
                status: false,
                reply: validateResult?.reply
            }
        }, { new: true })
            .then((results) => {
                const name = results.fName + ' ' + results.lName;
                const header = validateResult?.header;
                nodeMailer('InquiryResponse', results.email, header, name, validateResult?.reply);
                return (
                    res.status(200).json({
                        status: true,
                        message: 'Response sent Successfully.',
                    })
                )
            })
            .catch((error) => {
                console.log('Error while reply inquiry: ', error)
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

exports.deleteInquiry  = async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Inquiry.findOne({ _id })

        await Inquiry.findByIdAndDelete({ _id })
        res.status(200).json({
            status: true,
            message: "Inquiry deleted successfully...!",
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Inquiry does not exist...!"
        })
    }
}