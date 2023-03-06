const express=require("express")
const router=new express.Router()
const auth=require("../../Middleware/auth")
const patientController=require("../../Controllers/patientController")

router.get("/",auth,patientController.fetchPatients)

module.exports = router;

