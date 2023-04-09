const express=require("express");
const router=new express.Router();
const testReportController=require("../../Controllers/testReportController.js");
const auth=require("../../Middleware/auth.js");

router.post("/",auth,testReportController.addTestReport);
router.get("/laboratory/:id",auth,testReportController.fetchTestReportsByLaboratory);
router.get("/user/:id",auth,testReportController.fetchTestReportsByUser);

module.exports=router