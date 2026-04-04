import express from 'express';
const router = express.Router();
import { register, login, refresh, logout, createPassword, studentRegisterStep1, studentVerifyOTP, studentSetupPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.post('/create-password', createPassword);

router.post('/student/register-step1', studentRegisterStep1);
router.post('/student/verify-otp', studentVerifyOTP);
router.post('/student/setup-password', studentSetupPassword);

export default router;
