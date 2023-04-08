const express = require("express");
const router = new express.Router();
const testRequestController = require("../../Controllers/testRequestController.js");
const auth = require("../../Middleware/auth.js");

router.post("/", auth, testRequestController.addTestRequest)
router.get("/", auth, testRequestController.fetchTestRequests)
router.get("/status/:status", auth, testRequestController.fetchTestRequestsByStatus)
router.put("/:id", auth, testRequestController.updateTestRequest)
router.delete("/:id", auth, testRequestController.deleteTestRequest)
router.get("/:id", auth, testRequestController.fetchIndividualTestRequests)
router.get("/search/:patientId", auth, testRequestController.searchPatients)

module.exports = router