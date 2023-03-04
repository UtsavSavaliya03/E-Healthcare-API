const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../Models/User/UserModel.js");
const Otp = require("../Models/Otp/otpModal.js");
const { authSchema, signupSchema, sendOtpSchema, recoverPasswordSchema } = require("../Helpers/validator.js");

const createToken = (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRE_IN,
        },
    );
};

const mailer = (userEmail, otp, userName) => {
    var nodemailer = require('nodemailer');
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

exports.login = async (req, res, next) => {
    try {

        // 1) validate email and password
        const validateResult = await authSchema.validateAsync(req.body);

        await User.findOne({ email: validateResult?.email })
            .exec()
            .then((user) => {
                if (user === null) {
                    res.status(401).json({
                        status: false,
                        message: "User does not exist...!"
                    })
                } else {
                    bcrypt.compare(validateResult?.password, user.password, async (err, result) => {
                        if (!result) {
                            return res.status(401).json({
                                status: false,
                                message: 'Password does not match...!'
                            })
                        } else {
                            // Generate Token
                            const token = createToken(user.id);

                            await User.findOneAndUpdate({ email: user.email }, {
                                $set: { token: token }
                            }).then(async () => {
                                res.status(200).json({
                                    status: true,
                                    message: "Login successfully...!",
                                    token: token,
                                    data: {
                                        _id: user._id,
                                        fName: user.fName,
                                        lName: user.lName,
                                        email: user.email,
                                        mobileNo: user.mobileNo,
                                        role: user.role,
                                    }
                                })
                            })
                        }
                    })
                }
            })
            .catch((error) => {
                console.log('Error while login:', error);
                res.status(401).json({
                    status: false,
                    message: "Something went wrong, Please try again latter...!"
                })
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

exports.signup = async (req, res, next) => {
    try {

        const validateResult = await signupSchema.validateAsync(req.body);

        const isUserExist = await User.findOne({ email: validateResult?.email });

        if (isUserExist !== null) {
            return res.status(400).json({
                status: false,
                message: "User already exist...!"
            })
        } else {

            let encryptedPassword = await bcrypt.hash(validateResult?.password, 10);

            const user = await User.create({
                fName: validateResult?.fName,
                lName: validateResult?.lName,
                email: validateResult?.email,
                mobileNo: validateResult?.mobileNo,
                password: encryptedPassword,
            });

            res.status(201).json({
                status: true,
                message: "Signup successfully...!",
                data: user.id,
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

exports.findUser = async (req, res, next) => {
    try {
        await User.findById(req.params.id, { password: 0 })
            .then((result) => {
                if (result !== null) {
                    return (
                        res.status(200).json({
                            status: true,
                            data: result
                        })
                    )
                } else {
                    return (
                        res.status(401).json({
                            status: false,
                            message: "Invalid user id"
                        })
                    )
                }
            }).catch((error) => {
                console.log('Error while fetching user:', error);
                res.status(401).json({
                    status: false,
                    message: "Something went wrong, Please try again latter...!"
                })
            })
    } catch (error) {
        console.log('Error while fetching user:', error);
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.sendOtpForPassword = async (req, res, next) => {
    try {

        const validateResult = await sendOtpSchema.validateAsync(req.body);

        await User.findOne({ email: validateResult.email })
            .then(async (user) => {
                if (user !== null) {
                    return (
                        await Otp.findOne({ userId: user?._id })
                            .then(async (result) => {
                                const otpCode = Math.floor(100000 + Math.random() * 900000);
                                if (result !== null) {
                                    await Otp.findByIdAndUpdate(result?._id, {
                                        $set: {
                                            otp: otpCode,
                                            expiresIn: new Date().getTime() + (180 * 1000),  // Miliseconds(180 sec - 3 min)
                                            status: true
                                        }
                                    })
                                } else {
                                    const otp = await Otp.create({
                                        userId: user._id,
                                        otp: otpCode,
                                        expiresIn: new Date().getTime() + (180 * 1000), // Miliseconds(180 sec - 3 min)
                                        status: true
                                    });
                                }
                                /* ---- Sending email to user ---- */
                                const name = user.fName + ' ' + user.lName;
                                mailer(user.email, otpCode, name);

                                return (
                                    res.status(200).json({
                                        status: true,
                                        message: 'Otp is successfully send on ' + user.email,
                                        data: {
                                            userId: user._id,
                                            email: user.email
                                        },
                                    })
                                );
                            })
                    );
                } else {
                    return (
                        res.status(401).json({
                            status: false,
                            message: "User does not exist, please enter valid email address...!"
                        })
                    );
                }
            })
            .catch((error) => {
                console.log('Error sending otp for password recovery: ', error);
                res.status(401).json({
                    status: false,
                    message: "Something went wrong, Please try again latter...!"
                })
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
}

exports.recoverPassword = async (req, res, next) => {
    try {

        const validateResult = await recoverPasswordSchema.validateAsync(req.body);

        await Otp.findOne({ userId: validateResult?.userId })
            .then((result) => {
                let currentTime = new Date().getTime();
                let difference = result.expiresIn - currentTime;

                if (result.otp != validateResult?.otp) {
                    return res.status(401).json({
                        status: false,
                        message: "Please enter valid OTP...!"
                    })
                } else if (difference < 0 || (!result?.status)) {
                    return res.status(401).json({
                        status: false,
                        message: "Ops OTP is expired, try with another...!"
                    })
                } else {
                    bcrypt.hash(validateResult?.password, 10, async (err, hashPassword) => {
                        if (err) {
                            res.status(401).json({
                                status: false,
                                message: "Something went wrong, Please try again letter...!"
                            })
                        } else {
                            await User.findByIdAndUpdate(validateResult?.userId, {
                                $set: {
                                    password: hashPassword,
                                }
                            })
                            await Otp.findOneAndUpdate({ userId: validateResult?.userId }, {
                                $set: {
                                    status: false,
                                }
                            })
                            return res.status(200).json({
                                status: true,
                                message: "Password changed successfully...!"
                            })
                        }
                    })
                }
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
}