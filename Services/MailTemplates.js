const dotenv = require('dotenv');
dotenv.config();

exports.passwordRecoveryMail = (receiverEmail, subject, userName, otp) => {
    return ({
        from: process.env.MAILER_EMAIL, // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
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
    })
}

exports.enquiryResponseMail = (receiverEmail, subject, userName, body) => {
    return ({
        from: process.env.MAILER_EMAIL, // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
        text: "Hi " + userName + body, // plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <head>
        <style>
            body {
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        
            .container {
                width: 80%;
            }
        
            .container .title {
                margin-bottom: 20px;
            }
        
            .container .body {
                display: flex;
                justify-content: start;
            }
        
            .container .horizontal-bar {
                height: 50vh;
                width: 10px;
                border-radius: 5px;
                background: linear-gradient(180deg, rgba(12, 1, 199, 1) 0%, rgba(21, 21, 211, 1) 26%, rgba(0, 212, 255, 1)100%);
                margin-right: 30px;
            }
        
            .container .thank-you-msg {
                margin-top: 40px;
            }
        
            .container .footer {
                width: 100%;
                min-width: 350px;
                background: linear-gradient(90deg, rgba(23, 12, 214, 1) 0%, rgba(78, 153, 226, 1) 26%, rgba(255, 255, 255, 1) 54%);
                padding-left: 30px;
                margin-top: 70px;
            }
        
            .container .footer img {
                height: 100px;
            }
        </style>
        </head>
        
        <body>
            <div class="container">
                <div class="title">
                    <h1>Response to your Enquiry</h1>
                </div>
                <div class="body">
                    <div class="horizontal-bar"></div>
                    <div>
                        <h2>Hi ${userName},</h2>
                        <h3>
                            ${body}
                        </h3>
                        <h3 class="thank-you-msg">Thank you</h3>
                        <div class="footer">
                            <img src="https://res.cloudinary.com/drijxiov2/image/upload/v1677932558/Logo_tqsoyu.png" alt="logo">
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>`
    })
}