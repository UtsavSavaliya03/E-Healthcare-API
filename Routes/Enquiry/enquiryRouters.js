const express = require('express');
const router = express.Router();
const enquiryController = require('../../Controllers/enquiryController.js');
const auth = require('../../Middleware/auth.js')

router.post('/', enquiryController.enquiry);
router.get('/', auth, enquiryController.fetchEnquiry);
router.post('/reply', auth, enquiryController.replyEnquiry);

module.exports = router;