const TestRequest = require("../Models/TestRequest/testRequestModel.js");
const { addTestRequestSchema } = require("../Helpers/validator.js");

exports.addTestRequest = async (req, res, next) => {
  try {
    const validateResult = await addTestRequestSchema.validateAsync(req.body);

    const testRequest = TestRequest.create({
      patient: validateResult?.patient,
      doctor: validateResult?.doctor,
      laboratory: validateResult?.laboratory,
      type: validateResult?.type,
    });
    res.status(201).json({
      status: true,
      message: "Your report requested successfully...!",
      data: testRequest._id,
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

exports.fetchTestRequests = async (req, res) => {
  try {
    reportDetails = await TestRequest.find({}).populate(
      "patient",
      "fName lName patientId age mobileNo addressLine"
    );

    res.status(200).json({
      status: true,
      data: reportDetails,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};
exports.fetchTestRequestsByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    reportDetails = await TestRequest.find({ status }).populate(
      "patient",
      "fName lName email patientId age mobileNo addressLine"
    );

    res.status(200).json({
      status: true,
      data: reportDetails,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.updateTestRequest = async (req, res) => {
  try {
    const _id = req.params.id;

    await TestRequest.findByIdAndUpdate({ _id }, req.body);

    return res.status(200).json({
      status: true,
      message: "Report's information updated successfully...!",
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};
exports.deleteTestRequest = async (req, res) => {
  try {
    const _id = req.params.id;

    await TestRequest.findByIdAndDelete({ _id });

    return res.status(200).json({
      status: true,
      message: "Report's information deleted successfully...!",
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.fetchIndividualTestRequests = async (req, res) => {
  try {
    const _id = req.params.id;

    if (
      (patientReports = await TestRequest.find({ patient: _id })
        .populate("doctor", "fName lName")
        .populate("laboratory", "name")).length !== 0
    ) {
      res.status(200).json({
        status: true,
        data: patientReports,
      });
    } else {
      doctorReports = await TestRequest.find({ doctor: _id })
        .populate("patient", "fName lName")
        .populate("laboratory", "name");
      res.status(200).json({
        status: true,
        data: doctorReports,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.searchPatients = async (req, res) => {
  try {
    const filterObject = {
      patient: req.params.patientId,
    };

    const testRequest = await TestRequest.find().populate(
      "patient",
      "patientId fName lName age email mobileNo addressLine"
    );

    let filteredUsers = testRequest.filter((user) => {
      let isValid = true;
      for (key in filterObject) {
        isValid =
          isValid &&
          (user[key]?.patientId).toString().includes(filterObject[key]);
      }
      return isValid;
    });

    res.status(200).json({
      status: true,
      data: filteredUsers,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};
