const { newsletterSchema } = require("../Helpers/validator.js")
const Newsletter = require("../Models/Newsletter/newsletterModel.js")

exports.subscribeNewsletter = async (req, res, next) => {
    try {
        const validateResult = await newsletterSchema.validateAsync(req.body);

        const isUserExist = await Newsletter.findOne({ email: validateResult?.email });

        if (isUserExist !== null) {
            return res.status(200).json({
                status: true,
                message: "Successfully Subscribed...!",
            })
        } else {
            await Newsletter.create({
                email: validateResult?.email
            })
                .then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Successfully Subscribed...!",
                    });
                })
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