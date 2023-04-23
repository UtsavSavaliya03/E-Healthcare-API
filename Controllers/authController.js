const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/User/userModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");
const Laboratory = require("../Models/Laboratory/laboratoryModel.js");
const Otp = require("../Models/Otp/otpModel.js");
const nodeMailer = require("../Services/NodeMailer.js");
const generatePatientId = require("../Services/GeneratePatientId.js");
const {
  authSchema,
  signupSchema,
  sendOtpSchema,
  recoverPasswordSchema,
  changePasswordSchema,
  updateUserSchema
} = require("../Helpers/validator.js");
const CloudinaryService = require('../Services/CloudinaryServices.js');

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRE_IN,
    }
  );
};

exports.login = async (req, res, next) => {
  try {
    let Modal;
    if (req.params.type == 'laboratory') {
      Modal = Laboratory;
    } else if (req.params.type == 'doctor') {
      Modal = Doctor;
    } else {
      Modal = User;
    }

    // 1) validate email and password
    const validateResult = await authSchema.validateAsync(req.body);

    let blockedUser = await User.findOne({ $and: [{ email: validateResult?.email }, { active: false }] });
    
    if (blockedUser != null) {
      return (
        res.status(401).json({
          status: false,
          message: "Your account is currently blocked, Please contact administrator."
        })
      )
    }

    await Modal.findOne({ email: validateResult?.email }).populate(req.params.type == 'doctor' ? "hospital department" : '')
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
              user.password = undefined;
              user.status = undefined;

              const token = createToken(user.id);

              await User.findOneAndUpdate({ email: user.email }, {
                $set: { token: token }
              }).then(async () => {
                res.status(200).json({
                  status: true,
                  message: "Login successfully...!",
                  token: token,
                  data: user
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
    const isDoctorExist = await Doctor.findOne({ email: validateResult?.email });
    const isLaboratoryExist = await Laboratory.findOne({ email: validateResult?.email });

    if (isUserExist !== null || isDoctorExist !== null || isLaboratoryExist !== null) {
      return res.status(400).json({
        status: false,
        message: "User already exist...!",
      });
    } else {
      let encryptedPassword = await bcrypt.hash(validateResult?.password, 10);
      let patientId = await generatePatientId();

      const user = await User.create({
        patientId: patientId,
        fName: validateResult?.fName,
        lName: validateResult?.lName,
        email: validateResult?.email,
        mobileNo: validateResult?.mobileNo,
        password: encryptedPassword,
      });

      const name = user?.fName + " " + user?.lName;
      const header = `New Beginnings: Welcome ${name} to Health Horizon!`;
      nodeMailer("WelcomePatient", user?.email, header, name);

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
    const user = await User.findById(req.params.id, { password: 0, status: 0 });
    const doctor = await Doctor.findById(req.params.id, { password: 0, status: 0 }).populate("hospital department");
    const laboratory = await Laboratory.findById(req.params.id, { password: 0, status: 0 });

    if (user !== null || doctor !== null || laboratory !== null) {
      return res.status(200).json({
        status: true,
        data: user || doctor || laboratory,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Invalid user id",
      });
    }
  } catch (error) {
    console.log("Error while fetching user:", error);
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.sendOtpForPassword = async (req, res, next) => {
  try {
    const validateResult = await sendOtpSchema.validateAsync(req.body);

    let user;

    user = await User.findOne({ email: validateResult.email });
    if (!user) {
      user = await Doctor.findOne({ email: validateResult.email });
      if (!user) {
        user = await Laboratory.findOne({ email: validateResult.email });
      }
    }

    if (user !== null) {
      return await Otp.findOne({ userId: user?._id }).then(async (result) => {
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        if (result !== null) {
          await Otp.findByIdAndUpdate(result?._id, {
            $set: {
              otp: otpCode,
              expiresIn: new Date().getTime() + 180 * 1000, // Miliseconds(180 sec - 3 min)
              status: true,
            },
          });
        } else {
          const otp = await Otp.create({
            userId: user._id,
            otp: otpCode,
            expiresIn: new Date().getTime() + 180 * 1000, // Miliseconds(180 sec - 3 min)
            status: true,
          });
        }

        /* ---- Sending email to user ---- */
        let name;
        if (user.fName) {
          name = user?.fName + " " + user?.lName;
        } else {
          name = user?.name
        }
        const header = "Password recovery email from Health Horizon";
        nodeMailer("PasswordRecovery", user.email, header, name, "", otpCode);

        return res.status(200).json({
          status: true,
          message: "Otp is successfully send on " + user.email,
          data: {
            userId: user._id,
            email: user.email,
          },
        });
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "User does not exist, please enter valid email address...!",
      });
    }
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({
        status: false,
        message: error?.details[0]?.message,
      });
    }
    console.log("Error sending otp for password recovery: ", error);
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
    next(error);
  }
};

exports.recoverPassword = async (req, res, next) => {
  try {
    const validateResult = await recoverPasswordSchema.validateAsync(req.body);

    await Otp.findOne({ userId: validateResult?.userId }).then((result) => {
      let currentTime = new Date().getTime();
      let difference = result.expiresIn - currentTime;

      if (result.otp != validateResult?.otp) {
        return res.status(401).json({
          status: false,
          message: "Please enter valid OTP...!",
        });
      } else if (difference < 0 || !result?.status) {
        return res.status(401).json({
          status: false,
          message: "Ops OTP is expired, try with another...!",
        });
      } else {
        bcrypt.hash(validateResult?.password, 10, async (err, hashPassword) => {
          if (err) {
            res.status(401).json({
              status: false,
              message: "Something went wrong, Please try again letter...!",
            });
          } else {
            await User.findByIdAndUpdate(validateResult?.userId, {
              $set: {
                password: hashPassword,
              },
            });
            await Doctor.findByIdAndUpdate(validateResult?.userId, {
              $set: {
                password: hashPassword,
              },
            });
            await Laboratory.findByIdAndUpdate(validateResult?.userId, {
              $set: {
                password: hashPassword,
              },
            });
            await Otp.findOneAndUpdate(
              { userId: validateResult?.userId },
              {
                $set: {
                  status: false,
                },
              }
            );
            return res.status(200).json({
              status: true,
              message: "Password changed successfully...!",
            });
          }
        });
      }
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
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;

    await User.findByIdAndDelete({ _id });

    res.status(200).json({
      status: true,
      message: "Account Deleted Successfully...!",
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {

    const _id = req.params.id;

    if (req?.files !== null || req.body?.removeImg) {

      let profileImg = await CloudinaryService(req?.files?.image);

      await User.findByIdAndUpdate({ _id },
        {
          fName: req.body?.fName,
          lName: req.body?.lName,
          mobileNo: req.body?.mobileNo,
          age: req.body?.age,
          gender: req.body?.gender,
          addressLine: req.body?.addressLine,
          state: JSON.parse(req.body?.state),
          city: JSON.parse(req.body?.city),
          pincode: req.body?.pincode,
          profileImg: req.body?.removeImg ? null : profileImg?.url
        },
        { new: true }).then(
          (user) => {
            user.password = undefined;
            return res.status(200).json({
              status: true,
              data: user,
              message: "Information Updated Successfully...!",
            });
          }
        );
    } else {
      await User.findByIdAndUpdate({ _id },
        {
          fName: req.body?.fName,
          lName: req.body?.lName,
          mobileNo: req.body?.mobileNo,
          age: req.body?.age,
          gender: req.body?.gender,
          addressLine: req.body?.addressLine,
          state: JSON.parse(req.body?.state),
          city: JSON.parse(req.body?.city),
          pincode: req.body?.pincode,
        },
        { new: true }).then(
          (user) => {
            user.password = undefined;
            return res.status(200).json({
              status: true,
              data: user,
              message: "Information Updated Successfully...!",
            });
          }
        );
    }

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const validateResult = await changePasswordSchema.validateAsync(req.body);
    if (req.params.type == 'laboratory') {
      const laboratory = await Laboratory.findById(validateResult?.userId);
      if (laboratory != null) {
        passwordHandler(Laboratory, laboratory);
      }
    } else if (req.params.type == 'doctor') {
      const doctor = await Doctor.findById(validateResult?.userId);
      if (doctor != null) {
        passwordHandler(Doctor, doctor);
      }
    } else {
      const patient = await User.findById(validateResult?.userId);
      if (patient != null) {
        passwordHandler(User, patient);
      }
    }

    async function passwordHandler(Modal, user) {
      const isValidPassword = await bcrypt.compare(validateResult?.currentPassword, user?.password);

      if (isValidPassword) {
        const encryptedPassword = await bcrypt.hash(validateResult?.password, 10);
        await Modal.findByIdAndUpdate(validateResult?.userId, { $set: { password: encryptedPassword } });

        return (
          res.status(200).json({
            status: true,
            message: 'Password changed successfully..!'
          })
        )
      } else {
        res.status(400).json({
          status: false,
          message: "Current password does not match..!"
        })
      }
    }

  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({
        status: false,
        message: error?.details[0]?.message,
      });
    }
    next()
  }
}

exports.updateUserStatus = async (req, res) => {
  try {
    const _id = req.body.id;

    await User.findByIdAndUpdate({ _id }, { active: req.body.status })
    .then(()=>{
      return (
        res.status(200).json({
          status: true,
          message: 'Status updated successfully.'
        })
      )
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};
