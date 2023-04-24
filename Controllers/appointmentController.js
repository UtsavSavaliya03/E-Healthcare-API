const { addAppointmentSchema } = require("../Helpers/validator.js");
const Appointment = require("../Models/Appointment/appointmentModel.js");
const Doctor = require("../Models/Doctor/doctorModel.js");
const Hospital = require("../Models/Hospital/hospitalModel.js");
const nodeMailer = require('../Services/NodeMailer.js');

exports.addAppointment = async (req, res, next) => {
  try {
    const validateResult = await addAppointmentSchema.validateAsync(req.body);

    if (validateResult?.appoinmentId) {

      await Appointment.findByIdAndUpdate(validateResult?.appoinmentId, {
        $set: {
          appointmentDate: validateResult?.appointmentDate,
          appointmentTime: validateResult?.appointmentTime,
          description: validateResult?.description,
          status: 0
        }
      })

      res.status(201).json({
        status: true,
        message: "Your appointment rescheduled successfully...!",
        data: validateResult?.appoinmentId,
      });
    } else {
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

exports.fetchAppointments = async (req, res) => {
  try {
    appointmentDetails = await Appointment.find({}).populate("patient", "patientId fName lName age mobileNo").populate("doctor");

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

    await Appointment.findByIdAndUpdate({ _id }, req.body, { new: true });
    const appointmentData = await Appointment.findOne({ _id }).populate("patient").populate("doctor")
    const hospitalData = await Hospital.findOne({ _id: appointmentData.doctor.hospital })

    if (req.body.status == 1 && req.body.type == 'Doctor') {
      const header = `Hello, ${appointmentData.patient.fName} ${appointmentData.patient.lName} your appointment is accepted by Dr. ${appointmentData.doctor.fName} ${appointmentData.doctor.lName}`;
      nodeMailer('AcceptAppointmentMail', appointmentData.patient.email, header, `${appointmentData.patient.fName} ${appointmentData.patient.lName}`, { appointmentData: appointmentData, hospitalData: hospitalData });
    } else if (req.body.status == 3 && req.body.type == 'Doctor') {
      const header = `Hello, ${appointmentData.patient.fName} ${appointmentData.patient.lName} your appointment is rejected by Dr. ${appointmentData.doctor.fName} ${appointmentData.doctor.lName}`;
      nodeMailer('RejectAppointmentMail', appointmentData.patient.email, header, `${appointmentData.patient.fName} ${appointmentData.patient.lName}`, { appointmentData: appointmentData });
    }

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
          profileImg: 1,
        })
          .populate("hospital", "name email mobileNo addressLine city state")
          .populate("department", "name");
        responseData.push({
          patient: appointment?.patient,
          doctor: doctor,
          appointmentData: {
            appointmentDate: appointment?.appointmentDate,
            appointmentTime: appointment?.appointmentTime,
            status: appointment?.status,
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
      ).sort({ appointmentDate: -1 });
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

exports.fetchAppointmentsByStatus = async (req, res) => {
  try {

    appointmentDetails = await Appointment.find({ status: req.body.status, doctor: req.body.doctor }).populate(
      "patient",
      "fName lName email patientId age mobileNo addressLine"
    );

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

exports.fetchAppointmentsByDate = async (req, res) => {
  try {
    function formatDate() {
      let date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${year}/${month}/${day}`;
    }

    let statusObj = req.body.status ? { status: req.body.status } : {};

    appointmentDetails = await Appointment.find({ $and: [{ doctor: req.body.id }, { appointmentDate: req.body.date || formatDate() }, statusObj] })
      .populate("patient", "-password").populate("doctor", "-password");

    res.status(200).json({
      status: true,
      data: appointmentDetails,
    });

  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};

exports.fetchNonEmptyAppointmentSlots = async (req, res) => {
  try {

    appointmentDetails = await Appointment.find({ $and: [{ doctor: req.body.id }, { appointmentDate: req.body.date }, { status: { $lt: 3 } }] })
      .populate("patient", "-password").populate("doctor", "-password");

    res.status(200).json({
      status: true,
      data: appointmentDetails,
    });

  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: false,
      message: "Something went wrong, Please try again latter...!",
    });
  }
};