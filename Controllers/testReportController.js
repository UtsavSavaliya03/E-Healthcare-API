const TestReport = require("../Models/TestReport/testReportModel.js");
const { addTestReportSchema } = require("../Helpers/validator.js");

exports.addTestReport = async (req, res, next) => {
    try {
      const validateResult = await addTestReportSchema.validateAsync(req.body);
  
      const testReport = TestReport.create({
        patient: validateResult?.patient,
        doctor: validateResult?.doctor,
        laboratory: validateResult?.laboratory,
        type: validateResult?.type,
        reportInformation: validateResult?.reportInformation,
      });
      res.status(201).json({
        status: true,
        message: "Report generated successfully...!",
        data: testReport._id,
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
  
  exports.fetchTestReportsByLaboratory = async (req, res) => {
    try {
      const _id = req.params.id;
      reportDetails = await TestReport.find({ laboratory: _id })
        .populate("patient", "fName lName patientId age addressLine mobileNo")
        .populate("laboratory", "name mobileNo email addressLine city state")
        .populate("doctor", "fName lName hospital email mobileNo ");
  
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
  
  exports.fetchTestReportsByUser = async (req, res) => {
    try {
      const _id = req.params.id;
      reportDetails = await TestReport.find({ patient: _id })
        .populate("patient", "fName lName patientId age addressLine mobileNo")
        .populate("laboratory", "name mobileNo email addressLine city state")
        .populate("doctor", "fName lName hospital email mobileNo ");
  
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
  
  exports.fetchTestReportsByDoctor = async (req, res) => {
    try {
      const _id = req.params.id;
      reportDetails = await TestReport.find({ doctor: _id })
        .populate("patient", "fName lName patientId age addressLine mobileNo")
        .populate("laboratory", "name mobileNo email addressLine city state")
        .populate("doctor", "fName lName hospital email mobileNo ");
  
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