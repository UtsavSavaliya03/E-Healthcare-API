const departmentController = require("../../Controllers/departmentController.js")
const express = require("express")
const router = new express.Router()
const auth = require("../../Middleware/auth.js")

router.post("/", auth, departmentController.addDepartment)
router.get("/", auth, departmentController.fetchDepartments)
router.delete("/:id", auth, departmentController.deleteDepartment)
router.put("/:id", auth, departmentController.updateDepartment)

module.exports = router