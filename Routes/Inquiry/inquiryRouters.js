const express = require('express');
const router = express.Router();
const inquiryController = require('../../Controllers/inquiryController.js');
const auth = require('../../Middleware/auth.js')

router.post('/', inquiryController.inquiry);
router.get('/', auth, inquiryController.fetchInquiry);
router.post('/reply', auth, inquiryController.replyInquiry);
router.delete('/:id', auth, inquiryController.deleteInquiry);

module.exports = router;