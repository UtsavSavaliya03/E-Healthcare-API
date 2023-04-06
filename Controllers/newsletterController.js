const {
  newsletterSchema,
  newsletterReplytSchema,
} = require("../Helpers/validator.js");
const Newsletter = require("../Models/Newsletter/newsletterModel.js");
const nodeMailer = require("../Services/NodeMailer.js");

exports.subscribeNewsletter = async (req, res, next) => {
  try {
    const validateResult = await newsletterSchema.validateAsync(req.body);

    const isUserExist = await Newsletter.findOne({
      email: validateResult?.email,
    });

    if (isUserExist !== null) {
      return res.status(200).json({
        status: true,
        message: "Successfully Subscribed...!",
      });
    } else {
      await Newsletter.create({
        email: validateResult?.email,
      }).then(() => {
        res.status(200).json({
          status: true,
          message: "Successfully Subscribed...!",
        });
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
};

exports.sendMail = async (req, res, next) => {
  try {
    const validateResult = await newsletterReplytSchema.validateAsync(req.body);

    const newsletterEmails = await Newsletter.find({});
    let userEmails = [];
    let counter = 0;

    newsletterEmails?.map((email) => {
      const header = validateResult?.subject;
      const body = validateResult?.message;
      nodeMailer("Newsletter", email.email, header, "", body);
    });

    res.status(200).json({
      status: true,
      message: "Successfully Sent...!",
    });

  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({
        status: false,
        message: error?.details[0]?.message,
      });
    }
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
    next(error);
  }
};
