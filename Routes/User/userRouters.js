const express = require('express');
const router = express.Router();
const authController = require('../../Controllers/authController.js');
const auth = require('../../Middleware/auth.js');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/:id', auth, authController.findUser);
router.post('/sendOtp', authController.sendOtpForPassword);
router.post('/recoverPassword', authController.recoverPassword);
router.delete('/:id', auth, authController.deleteUser);
router.put('/:id', auth, authController.updateUser);

module.exports = router;