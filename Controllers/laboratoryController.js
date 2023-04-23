const Laboratory = require("../Models/Laboratory/laboratoryModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");
const User = require("../Models/User/userModel.js");
const {
  addLaboratorySchema,
  searchLaboratorySchema,
} = require("../Helpers/validator.js");
const generatePassword = require("../Services/GeneratePassword.js");
const bcrypt = require("bcrypt");
const nodeMailer = require("../Services/NodeMailer.js");

exports.addLaboratory = async (req, res, next) => {
  try {
    const validateResult = await addLaboratorySchema.validateAsync(req.body);

    const isDoctorExist = await Doctor.findOne({ email: validateResult?.email });
    const isUserExist = await User.findOne({ email: validateResult?.email });
    const isLaboratoryExist = await Laboratory.findOne({
      $or: [{ email: validateResult?.email }, { name: validateResult?.name }],
    });


    if (isDoctorExist !== null || isUserExist !== null || isLaboratoryExist !== null) {
      return res.status(400).json({
        status: false,
        message:
          "Laboratory with this name or email address is already exist, try with another email address...!",
      });
    } else {

      let password = await generatePassword();
      let encryptedPassword = await bcrypt.hash(password, 10);

      const laboratory = await Laboratory.create({
        name: validateResult?.name,
        email: validateResult?.email,
        password: encryptedPassword,
        mobileNo: validateResult?.mobileNo,
        shortBio: validateResult?.shortBio,
        addressLine: validateResult?.addressLine,
        city: validateResult?.city,
        state: validateResult?.state,
        pincode: validateResult?.pincode,
      });

      const name = validateResult?.name;
      const header = `New Beginnings: Welcome ${name} to Health Horizon!`;
      nodeMailer("WelcomeLaboratory", laboratory?.email, header, name, {
        email: laboratory?.email,
        password: password,
      });

      res.status(201).json({
        status: true,
        message: "Laboratory added successfully...!",
        data: laboratory._id,
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

exports.fetchLaboratories = async (req, res) => {
  try {
    const laboratoriesDetails = await Laboratory.find().sort({ name: 1 });
    res.status(200).json({
      status: true,
      data: laboratoriesDetails,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.fetchLaboratoryById = async (req, res) => {
  try {
    const _id = req.params.id;

    const laboratoryDetails = await Laboratory.findOne({ _id });

    res.status(200).json({
      status: true,
      data: laboratoryDetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Laboratory's information does exist...!",
    });
  }
};

exports.fetchLaboratoriesByPincode = async (req, res) => {
  try {
    const isLaboratoryExist = await Laboratory.findOne({ pincode: req.params.pincode });

    if (isLaboratoryExist !== null) {
      const laboratoriesDetails = await Laboratory.find({ pincode: req.params.pincode });
      res.status(200).json({
        status: true,
        data: laboratoriesDetails,
      });
    } else {
      const laboratoriesDetails = await Laboratory.find()
      res.status(200).json({
        status: true,
        data: laboratoriesDetails,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.deleteLaboratory = async (req, res) => {
  try {
    const _id = req.params.id;

    await Laboratory.findOne({ _id });

    await Laboratory.findByIdAndDelete({ _id });
    res.status(200).json({
      status: true,
      message: "Laboratory's detail deleted successfully...!",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Laboratory's information does not exist...!",
    });
  }
};

exports.updateLaboratory = async (req, res) => {
  try {
    const _id = req.params.id;

    await Laboratory.findByIdAndUpdate({ _id }, req.body);

    return res.status(200).json({
      status: true,
      message: "Information Updated Successfully...!",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.searchLaboratories = async (req, res) => {
  try {
    const validateResult = await searchLaboratorySchema.validateAsync(req.body);

    var regexLaboratory = new RegExp(validateResult.name, "i");

    if (validateResult?.state && validateResult?.city === null) {
      laboratoriesDetails = await Laboratory.find({
        $and: [
          { name: regexLaboratory },
          { "state.isoCode": validateResult?.state },
        ],
      }).sort({ name: 1 });
    } else if (validateResult?.state && validateResult?.city) {
      laboratoriesDetails = await Laboratory.find({
        $and: [
          { name: regexLaboratory },
          { "state.isoCode": validateResult?.state },
          { "city.name": validateResult?.city },
        ],
      }).sort({ name: 1 });
    } else {
      laboratoriesDetails = await Laboratory.find({
        name: regexLaboratory,
      }).sort({ name: 1 });
    }

    res.status(200).json({
      status: true,
      data: laboratoriesDetails,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};
