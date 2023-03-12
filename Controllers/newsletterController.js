const { newsletterSchema } = require("../Helpers/validator.js")
const Newsletter = require("../Models/Newsletter/newsletterModel.js")

exports.subscribeNewsletter = async (req, res, next) => {
    try {
        const validateResult = await newsletterSchema.validateAsync(req.body);

        await Newsletter.create({
            email: validateResult?.email
        })
    

        res.status(200).json({
            status: true,
            message: "NewsLetter successfully sent to your e-mail address...!",
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