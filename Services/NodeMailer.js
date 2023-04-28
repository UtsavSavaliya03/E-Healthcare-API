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
  switch (type) {
    case 'PasswordRecovery':
      var mailOptions = MailTemplets.passwordRecoveryMail(userEmail, header, userName, otp);
      break;
    case 'InquiryResponse':
      var mailOptions = MailTemplets.inquiryResponseMail(userEmail, header, userName, body);
      break;
    case 'WelcomeDoctor':
      var mailOptions = MailTemplets.doctorWelcomeMail(userEmail, header, userName, body);
      break;
    case 'WelcomeLaboratory':
      var mailOptions = MailTemplets.laboratoryWelcomeMail(userEmail, header, userName, body);
      break;
    case 'WelcomePatient':
      var mailOptions = MailTemplets.patientWelcomeMail(userEmail, header, userName);
      break;
    case 'Newsletter':
      var mailOptions = MailTemplets.newsletterMail(userEmail, header, userName, body);
      break;
    case 'AcceptAppointmentMail':
      var mailOptions = MailTemplets.acceptAppointmentMail(userEmail, header, userName, body);
      break;
    case 'RejectAppointmentMail':
      var mailOptions = MailTemplets.rejectAppointmentMail(userEmail, header, userName, body);
      break;
    case 'AcceptTestRequestMail':
      var mailOptions = MailTemplets.acceptTestRequestMail(userEmail, header, userName, body);
      break;
    case 'RejectTestRequestMail':
      var mailOptions = MailTemplets.rejectTestRequestMail(userEmail, header, userName, body);
      break;
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