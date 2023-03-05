const nodemailer = require('nodemailer');

function nodeMailer(userEmail, otp, userName) {
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
    var mailOptions = {
        from: process.env.MAILER_EMAIL, // sender address
        to: userEmail, // list of receivers
        subject: "Password recovery email from Health Horizon", // Subject line
        text: "Hey " + userName + ", You asked and we delivered, let's reset your password with the help of One Time Password. Your OTP is " + otp + "," + "which will be expire in next 03 minutes.", // plain text body

        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .main-container {
                    background: rgb(2, 0, 36);
                    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 22%, rgba(0, 212, 255, 1) 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 50px 150px;
                    border-radius: 30px;
                }
        
                .header {
                    margin-bottom: 50px;
                    text-align: center;
                }
        
                .logo-container img {
                    height: 150px;
                    margin-bottom: 30px;
                }
        
                .header-title {
                    color: white;
                    font-size: 50px;
                    font-variant: small-caps;
                }
        
                .message-container {
                    color: white;
                    font-size: 24px;
                    padding: 0px 50px;
                }
        
                /* --------- Responsive --------- */
                @media (max-width: 780px) {
                    .main-container {
                        padding: 35px;
                    }
        
                    .logo-container img {
                        height: 110px;
                        margin-bottom: 20px;
                    }
        
                    .header-title {
                        font-size: 30px;
                    }
        
                    .message-container {
                        padding: 0px 10px;
                    }
                }
            </style>
        </head>
        
        <body class="main-container">
            <div>
                <div class="header">
                    <div class="logo-container">
                        <img src="https://res.cloudinary.com/drijxiov2/image/upload/v1677932558/Logo_tqsoyu.png" alt="logo">
                    </div>
                    <div class="header-title">
                        Forgot your password?
                    </div>
                </div>
                <div class="message-container p-lg-5 mt-3">
                    Hey ${userName}, <br /><br />
                    You asked and we delivered, let's reset your password with the help of One Time Password.
                    Your OTP is <b>${otp}</b> which will be expire in next 03 minutes.<br /><br />
                    Thank you.
                </div>
            </div>
        </body>
        
        </html>`
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