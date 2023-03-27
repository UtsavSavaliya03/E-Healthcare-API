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

exports.inquiryResponseMail = (receiverEmail, subject, userName, body) => {
    return ({
        from: process.env.MAILER_EMAIL, // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
        text: "Hi " + userName + body, // plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        
                .email-body {
                    padding: 10px 0px 10px 50px;
                    border-left: 8px solid rgba(23, 12, 214, 1);
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
                    <div>
                        <div class="email-body">
                            <h2>Hi ${userName},</h2>
                            <h3>
                                ${body}
                            </h3>
                            <h3 class="thank-you-msg">Best regards,<br/>Health Horizon and Teams</h3>
                        </div>
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

exports.doctorWelcomeMail = (receiverEmail, subject, userName, body) => {
    return ({
        from: process.env.MAILER_EMAIL, // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        
                .email-body {
                    padding: 10px 0px 10px 50px;
                    border-left: 8px solid rgba(23, 12, 214, 1),;
                }
        
                .container .thank-you-msg {
                    margin-top: 40px;
                }
        
                .container .footer {
                    width: 100%;
                    background: linear-gradient(90deg, rgba(23, 12, 214, 1) 0%, rgba(78, 153, 226, 1) 26%, rgba(255, 255, 255, 1) 54%);
                    padding-left: 30px;
                    margin-top: 70px;
                }
        
                .container .footer img {
                    height: 100px;
                }
        
                .text-blue {
                    color: rgb(12 1 199);
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <div class="title">
                    <h1>${subject}</h1>
                </div>
                <div class="body">
                    <div>
                        <div class="email-body">
                            <h2>Dear Dr. ${userName},</h2>
                            <h3>
                                I am pleased to welcome you to our team of healthcare providers at <span class="text-blue">
                                    Health
                                    Horizon</span>. We are thrilled
                                that you have joined us as a doctor, and we look forward to collaborating with you to deliver
                                high-quality care to our patients.<br /><br />
        
                                As a doctor on our platform, you will have access to a variety of tools and resources that will
                                help
                                you provide exceptional care to your patients. Our website is designed to make it easy for
                                patients
                                to connect with you and to schedule appointments at their convenience. We are committed to
                                providing
                                a seamless and user-friendly experience for both you and your patients.<br /><br />
        
                                We value your expertise and dedication to your patients, and we are excited to work with you to
                                improve healthcare outcomes. If you have any questions or concerns, please don't hesitate to
                                reach
                                out to us. We are here to support you every step of the way.<br /><br />
        
                                Once again, welcome to our team, and thank you for choosing <span class="text-blue">Health
                                    Horizon</span> as your platform for
                                delivering care.<br /><br />
        
                                Here is your login credentials,<br />
                                Email : <span class="text-blue">${body?.email}</span><br />
                                Password : <span class="text-blue">${body?.password}</span><br /><br />
        
                                Best regards,<br /><br />
        
                                Health Horizon and Teams
                            </h3>
                        </div>
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