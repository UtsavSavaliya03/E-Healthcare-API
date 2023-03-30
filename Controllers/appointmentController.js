const { addAppointmentSchema } = require("../Helpers/validator.js")
const Appointment = require("../Models/Appointment/appointmentModel.js")

exports.addAppointment = async (req, res, next) => {
    try {
        const validateResult = await addAppointmentSchema.validateAsync(req.body);
        const appointment = await Appointment.create({
            patient: validateResult?.patient,
            doctor: validateResult?.doctor,
            appointmentDate: validateResult?.appointmentDate,
            appointmentTime: validateResult?.appointmentTime,
            description: validateResult?.description
        })

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
}

exports.fetchAppointments = async (req, res) => {
    try {
        appointmentDetails = await Appointment.find({})

        res.status(200).json({
            status: true,
            data: appointmentDetails
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        const _id = req.params.id;

        await Appointment.findByIdAndDelete({ _id })
        res.status(200).json({
            status: true,
            message: "Appointment canceled successfully...!",
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.updateAppointment = async (req, res) => {
    try {
        const _id = req.params.id;

        await Appointment.findByIdAndUpdate({ _id }, req.body)

        return res.status(200).json({
            status: true,
            message: "Appointment's information updated successfully...!"
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}

exports.fetchIndividualAppointments = async (req, res) => {
    try {
        const _id = req.params.id

        if ((patientAppointments = await Appointment.find({ patient: _id }).populate('doctor')).length !== 0) {

            res.status(200).json({
                status: true,
                data: patientAppointments
            })
        } else {

            doctorAppointments = await Appointment.find({ doctor: _id }).populate("patient")
            res.status(200).json({
                status: true,
                data: doctorAppointments
            })
        }



    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Something went wrong, Please try again latter...!"
        })
    }
}
