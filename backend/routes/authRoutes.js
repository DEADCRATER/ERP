const express = require('express');
const router = express.Router();
const { register, login, refresh, logout, createPassword, studentRegisterStep1, studentVerifyOTP, studentSetupPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.post('/create-password', createPassword);

router.post('/student/register-step1', studentRegisterStep1);
router.post('/student/verify-otp', studentVerifyOTP);
router.post('/student/setup-password', studentSetupPassword);

module.exports = router;
