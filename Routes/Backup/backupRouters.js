const express = require("express");
const router = new express.Router();
const backupController = require("../../Controllers/backupController.js");

router.post("/hospitals", backupController.hospitals);
router.post("/doctors", backupController.doctors);
router.post("/patients", backupController.patients);
router.post("/laboratories", backupController.laboratories);

module.exports = router;