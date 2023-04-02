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
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to HealthHorizon!</title>
            <style>
              body {
                background-color: #f2f2f2;
                font-family: Arial, sans-serif;
              }
              .container {
                margin: 0 auto;
              }
              .header {
                background: linear-gradient(90deg, rgb(13, 3, 213) 0%, rgb(12, 12, 195) 26%, rgba(0, 212, 255, 1) 100%);        color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                background: linear-gradient(to bottom right, #ffffff, #f2f2f2);
                padding: 20px;
                font-size: 18px;
                line-height: 1.5;
                color: #333333;
                text-align: justify;
              }
              .footer {
                background: linear-gradient(90deg, rgb(13, 3, 213) 0%, rgb(12, 12, 195) 26%, rgba(0, 212, 255, 1) 100%);        color: #666666;
                font-size: 14px;
                text-align: center;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div>
                  <img
                    style="width: 180px"
                    src="https://res.cloudinary.com/drijxiov2/image/upload/v1677932558/Logo_tqsoyu.png"
                    alt="Logo"
                    class="logo"
                  />
                </div>
                <h1>Welcome to HealthHorizon!</h1>
              </div>
              <div class="content">
                <p>Dear ${userName},</p>
                <p>${body}</p>
                <br>
                <p>Thanks you,</p>
                <p>HealthHorizon Team</p>
              </div>
        
              <div class="footer">
                <div style="color: white; font-weight: 600">
                    <h1>Copyright © 2023 HealthHorizon. All rights reserved.</h1>
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
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to HealthHorizon!</title>
            <style>
              body {
                background-color: #f2f2f2;
                font-family: Arial, sans-serif;
              }
              .container {
                margin: 0 auto;
              }
              .header {
                background: linear-gradient(90deg, rgb(13, 3, 213) 0%, rgb(12, 12, 195) 26%, rgba(0, 212, 255, 1) 100%);        color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                background: linear-gradient(to bottom right, #ffffff, #f2f2f2);
                padding: 20px;
                font-size: 18px;
                line-height: 1.5;
                color: #333333;
                text-align: justify;
              }
              .footer {
                background: linear-gradient(90deg, rgb(13, 3, 213) 0%, rgb(12, 12, 195) 26%, rgba(0, 212, 255, 1) 100%);        color: #666666;
                font-size: 14px;
                text-align: center;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div>
                  <img
                    style="width: 180px"
                    src="https://res.cloudinary.com/drijxiov2/image/upload/v1677932558/Logo_tqsoyu.png"
                    alt="Logo"
                    class="logo"
                  />
                </div>
                <h1>Welcome to HealthHorizon!</h1>
              </div>
              <div class="content">
                <p>Dear ${userName},</p>
                <p>
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
                </p>
                <br>
                <p>Thanks you,</p>
                <p>HealthHorizon Team</p>
              </div>
        
              <div class="footer">
                <div style="color: white; font-weight: 600">
                  <p>
                    You received this email because you signed up for an account at
                    HealthHorizon.
                  </p>
                  <p>If you did not create an account, please disregard this email.</p>
                </div>
              </div>
            </div>
          </body>
        </html>`
    })
}

exports.patientWelcomeMail = (receiverEmail, subject, userName) => {
    return ({
        from: process.env.MAILER_EMAIL, // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
        html: `<!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to HealthHorizon!</title>
            <style>
              body {
                background-color: #f2f2f2;
                font-family: Arial, sans-serif;
              }
              .container {
                margin: 0 auto;
              }
              .header {
                background: linear-gradient(90deg, rgb(13, 3, 213) 0%, rgb(12, 12, 195) 26%, rgba(0, 212, 255, 1) 100%);        color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                background: linear-gradient(to bottom right, #ffffff, #f2f2f2);
                padding: 20px;
                font-size: 18px;
                line-height: 1.5;
                color: #333333;
                text-align: justify;
              }
              .footer {
                background: linear-gradient(90deg, rgb(13, 3, 213) 0%, rgb(12, 12, 195) 26%, rgba(0, 212, 255, 1) 100%);        color: #666666;
                font-size: 14px;
                text-align: center;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div>
                  <img
                    style="width: 180px"
                    src="https://res.cloudinary.com/drijxiov2/image/upload/v1677932558/Logo_tqsoyu.png"
                    alt="Logo"
                    class="logo"
                  />
                </div>
                <h1>Welcome to HealthHorizon!</h1>
              </div>
              <div class="content">
                <p>Dear ${userName},</p>
                <p>
                  Welcome to HealthHorizon, the place where we put your health first. We
                  understand that your health is your top priority, and we are here to
                  support you in your journey towards better health and wellbeing.
                </p>
                <p>
                  At HealthHorizon, we provide a wide range of healthcare services,
                  including personalized health assessments, preventive health checkups,
                  chronic disease management, and much more. Our team of highly
                  qualified and experienced doctors, nurses, and healthcare
                  professionals are dedicated to providing you with the best possible
                  care and treatment.
                </p>
                <p>
                  We know that navigating the healthcare system can be overwhelming, and
                  that's why we're here to help. Whether you need advice on managing a
                  chronic condition, guidance on healthy lifestyle choices, or simply a
                  listening ear, our team is here for you.
                </p>
                <p>
                  As a new member of the HealthHorizon community, we encourage you to
                  explore all the resources available to you, including our patient
                  portal, health library, and support groups. We believe that informed
                  patients are empowered patients, and we are committed to keeping you
                  informed and engaged in your healthcare journey.
                </p>
                <p>
                  Thank you for choosing HealthHorizon as your healthcare partner. We
                  are honored to be a part of your healthcare journey and look forward
                  to serving you.
                </p>
                <br>
                <p>Thanks you,</p>
                <p>HealthHorizon Team</p>
              </div>
        
              <div class="footer">
                <div style="color: white; font-weight: 600">
                  <p>
                    You received this email because you signed up for an account at
                    HealthHorizon.
                  </p>
                  <p>If you did not create an account, please disregard this email.</p>
                </div>
              </div>
            </div>
          </body>
        </html>`
    })
}