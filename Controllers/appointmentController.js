const { addAppointmentSchema } = require("../Helpers/validator.js");
const Appointment = require("../Models/Appointment/appointmentModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");

exports.addAppointment = async (req, res, next) => {
  try {
    const validateResult = await addAppointmentSchema.validateAsync(req.body);
    const appointment = await Appointment.create({
      patient: validateResult?.patient,
      doctor: validateResult?.doctor,
      appointmentDate: validateResult?.appointmentDate,
      appointmentTime: validateResult?.appointmentTime,
      description: validateResult?.description,
    });

    res.status(201).json({
      status: true,
      message: "Your appointment requested successfully...!",
      data: appointment._id,
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

exports.fetchAppointments = async (req, res) => {
  try {
    appointmentDetails = await Appointment.find({}).populate("patient","patientId fName lName age mobileNo" );

    res.status(200).json({
      status: true,
      data: appointmentDetails,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const _id = req.params.id;

    await Appointment.findByIdAndDelete({ _id });
    res.status(200).json({
      status: true,
      message: "Appointment canceled successfully...!",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const _id = req.params.id;

    await Appointment.findByIdAndUpdate({ _id }, req.body);

    return res.status(200).json({
      status: true,
      message: "Appointment's information updated successfully...!",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.fetchIndividualAppointments = async (req, res) => {
  try {
    const _id = req.params.id;

    if (
      (patientAppointments = await Appointment.find({ patient: _id }).populate(
        "doctor"
      )).length !== 0
    ) {
      patientAppointments = await Appointment.find({ patient: _id }).sort({
        appointmentDate: -1,
      });
      let responseData = [];
      let counter = 0;
      patientAppointments?.map(async (appointment) => {
        const doctor = await Doctor.findById(appointment?.doctor, {
          fName: 1,
          lName: 1,
          email: 1,
          mobileNo: 1,
          hospital: 1,
          department: 1,
        })
          .populate("hospital", "name email mobileNo addressLine city state")
          .populate("department", "name");
        responseData.push({
          patient: appointment?.patient,
          doctor: doctor,
          appointmentData: {
            appointmentDate: appointment?.appointmentDate,
            appointmentTime: appointment?.appointmentTime,
            status:appointment?.status,
            _id: appointment?._id,
          },
        });

        if (++counter === patientAppointments?.length) {
          res.status(200).json({
            status: true,
            data: responseData,
          });
        }
      });
    } else {
      doctorAppointments = await Appointment.find({ doctor: _id }).populate(
        "patient"
      );
      res.status(200).json({
        status: true,
        data: doctorAppointments,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};