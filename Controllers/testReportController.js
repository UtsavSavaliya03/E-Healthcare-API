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
  