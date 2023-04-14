const express = require("express");
const router = new express.Router();
const auth = require("../../Middleware/auth");
const serviceController = require("../../Controllers/serviceController.js");

router.get("/laboratory/report/:id", auth, serviceController.totalReportOflaboratory);
router.get("/doctor/patient/:id", auth, serviceController.totalPatientsOfDoctor);
router.get("/admin/dashboard/", auth, serviceController.adminDashboardData);


module.exports = router;