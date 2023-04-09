const express = require('express');
const router = new express.Router();
const departmentController = require('../../Controllers/departmentController.js');
const auth = require('../../Middleware/auth.js');

router.post('/', auth, departmentController.addDepartment);
router.get('/active', auth, departmentController.fetchActiveDepartments);
router.get('/', auth, departmentController.fetchDepartments);
router.get('/:id', auth, departmentController.fetchDepartmentById);
router.delete('/:id', auth, departmentController.deleteDepartment);
router.post('/search', auth, departmentController.searchDepartment);
router.post('/update/:id', auth, departmentController.updateDepartment);

module.exports = router;