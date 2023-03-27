const express = require('express');
const router = new express.Router();
const departmentController = require('../../Controllers/departmentController.js');
const auth = require('../../Middleware/auth.js');

router.post('/', auth, departmentController.addDepartment);
router.get('/', auth, departmentController.fetchDepartments);
router.get('/:id', auth, departmentController.fetchDepartmentById);

module.exports = router;