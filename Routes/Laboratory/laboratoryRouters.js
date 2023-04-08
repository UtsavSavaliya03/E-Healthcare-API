const express=require("express");
const router=new express.Router();
const auth=require("../../Middleware/auth.js");
const laboratoryController=require("../../Controllers/laboratoryController.js");

router.post("/",auth,laboratoryController.addLaboratory)
router.get("/",auth,laboratoryController.fetchLaboratories)
router.get("/:id",auth,laboratoryController.fetchLaboratoryById)
router.get("/pincode/:pincode",auth,laboratoryController.fetchLaboratoriesByPincode)
router.delete("/:id",auth,laboratoryController.deleteLaboratory)
router.put("/:id",auth,laboratoryController.updateLaboratory)
router.post("/search",auth,laboratoryController.searchLaboratories)

module.exports=router