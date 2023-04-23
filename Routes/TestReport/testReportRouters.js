const express=require("express");
const router=new express.Router();
const testReportController=require("../../Controllers/testReportController.js");
const auth=require("../../Middleware/auth.js");

router.post("/",auth,testReportController.addTestReport);
router.get("/laboratory/:id",auth,testReportController.fetchTestReportsByLaboratory);
router.get("/user/:id",auth,testReportController.fetchTestReportsByUser);
router.get("/doctor/:id",auth,testReportController.fetchTestReportsByDoctor);

module.exports=router