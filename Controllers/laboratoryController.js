const Laboratory = require("../Models/Laboratory/laboratoryModel.js");
const { addLaboratorySchema } = require("../Helpers/validator.js");

exports.addLaboratory = async (req, res, next) => {
  try {
    const validateResult = await addLaboratorySchema.validateAsync(req.body);

    const isLaboratoryExist = await Laboratory.findOne({
      $or: [{ email: validateResult?.email }, { name: validateResult?.name }],
    });

    if (isLaboratoryExist !== null) {
      return res.status(400).json({
        status: false,
        message:
          "Laboratory with this name or email address is already exist, try with another email address...!",
      });
    } else {
      const laboratory = await Laboratory.create({
        name: validateResult?.name,
        email: validateResult?.email,
        mobileNo: validateResult?.mobileNo,
        shortBio: validateResult?.shortBio,
        addressLine: validateResult?.addressLine,
        city: validateResult?.city,
        state: validateResult?.state,
        pincode: validateResult?.pincode,
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
    var pincode = req.params.pincode;

    const isLaboratoryExist = await Laboratory.findOne({ pincode });

    if (isLaboratoryExist !== null) {
      const laboratoriesDetails = await Laboratory.findOne({ pincode });
      res.status(200).json({
        status: true,
        data: laboratoriesDetails,
      });
    } else {
      const allPincodes = await Laboratory.find(
        {},
        { _id: 0, pincode: 1 }
      ).sort({ pincode: 1 });
      const availablePincodes = [];
      allPincodes.map((pin) => {
        return availablePincodes.push(pin.pincode);
      });
      const nearestPincode = availablePincodes.filter((availablePin) => {
        return availablePin > pincode;
      });
      const laboratoriesDetails = await Laboratory.findOne({
        pincode: nearestPincode[0],
      });
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