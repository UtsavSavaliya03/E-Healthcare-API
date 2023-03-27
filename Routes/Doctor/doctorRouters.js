const express = require('express');
const router = express.Router();
const doctorController = require('../../Controllers/doctorController.js');
const auth = require('../../Middleware/auth.js');

router.post('/', auth, doctorController.addDoctor);
router.get('/', auth, doctorController.fetchDoctors);
router.get('/:id', auth, doctorController.fetchDoctorById);
router.delete('/:id', auth, doctorController.deleteDoctor);
router.post('/update/:id', auth, doctorController.updateDoctor);
router.post('/search', auth, doctorController.searchDoctor);

module.exports = router;