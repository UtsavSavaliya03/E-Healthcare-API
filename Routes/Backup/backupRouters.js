const express = require("express");
const router = new express.Router();
const backupController = require("../../Controllers/backupController.js");

router.post("/doctors", backupController.doctors);
router.post("/patients", backupController.patients);

module.exports = router;