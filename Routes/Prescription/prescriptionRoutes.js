const express = require("express")
const router = new express.Router()
const prescriptionControllers = require("../../Controllers/prescriptionController.js")
const auth = require('../../Middleware/auth.js');

router.post("/", auth, prescriptionControllers.addPrescription)
router.get("/", auth, prescriptionControllers.fetchPrescriptions)
router.get("/:id", auth, prescriptionControllers.fetchIndividualPrescriptions)

module.exports = router