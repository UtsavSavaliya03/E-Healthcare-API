const express = require("express")
const router = new express.Router()
const appointmentControllers = require("../../Controllers/appointmentController.js")
const auth = require('../../Middleware/auth.js');

router.post("/", auth, appointmentControllers.addAppointment)
router.get('/', auth, appointmentControllers.fetchAppointments);
router.delete('/:id', auth, appointmentControllers.deleteAppointment);
router.put('/:id', auth, appointmentControllers.updateAppointment);

module.exports = router