const express = require('express');
const router = new express.Router();
const hospitalController = require('../../Controllers/hospitalController.js');
const auth = require('../../Middleware/auth.js');

router.post('/', auth, hospitalController.addHospital);
router.get('/', auth, hospitalController.fetchHospitals);
router.post('/search', auth, hospitalController.searchHospitals);
router.get('/:id', auth, hospitalController.fetchHospitalById);


module.exports = router;