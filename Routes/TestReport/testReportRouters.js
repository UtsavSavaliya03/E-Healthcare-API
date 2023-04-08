const express=require("express")
const router=new express.Router()
const testReportController=require("../../Controllers/testReportController.js");
const auth=require("../../Middleware/auth.js");

router.post("/",auth,testReportController.addTestReport)

module.exports=router