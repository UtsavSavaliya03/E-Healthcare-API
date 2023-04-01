const express=require("express")
const router=new express.Router()
const auth=require("../../Middleware/auth")
const patientController=require("../../Controllers/patientController")

router.get("/",auth,patientController.fetchPatients);
router.get("/search/:patientId",auth,patientController.searchPatients);

module.exports = router;