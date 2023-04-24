const express = require("express")
const router = new express.Router()
const appointmentControllers = require("../../Controllers/appointmentController.js")
const auth = require('../../Middleware/auth.js');

router.post("/", auth, appointmentControllers.addAppointment)
router.get('/', auth, appointmentControllers.fetchAppointments);
router.get('/:id', auth, appointmentControllers.fetchIndividualAppointments);
router.delete('/:id', auth, appointmentControllers.deleteAppointment);
router.put('/:id', auth, appointmentControllers.updateAppointment);
router.post('/status', auth, appointmentControllers.fetchAppointmentsByStatus);
router.post('/date', appointmentControllers.fetchAppointmentsByDate);
router.post('/nonEmptySlot', appointmentControllers.fetchNonEmptyAppointmentSlots);

module.exports = router