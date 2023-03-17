const nodemailer = require('nodemailer');
const MailTemplets = require('./MailTemplates.js');

function nodeMailer(type, userEmail, header, userName, body, otp) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILER_EMAIL, // generated ethereal user
            pass: process.env.MAILER_EMAIL_PASS, // generated ethereal password
        },
    });
    if (type == 'PasswordRecovery') {
        var mailOptions = MailTemplets.passwordRecoveryMail(userEmail, header, userName, otp);
    } else if (type == 'EnquiryResponse') {
        var mailOptions = MailTemplets.enquiryResponseMail(userEmail, header, userName, body);
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
};

module.exports = nodeMailer;