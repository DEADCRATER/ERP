import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import StudentDetails from '../models/StudentDetails.js';
import College from '../models/College.js';
import SuperAdmin from '../models/SuperAdmin.js';
import generateTokens from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// @route POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  if (user) {
    if (role === 'SUPER_ADMIN') {
      await SuperAdmin.create({ user: user._id });
    }

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data input');
  }
});

// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const { accessToken, refreshToken } = generateTokens(user._id,user.role);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route POST /api/auth/refresh
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.jwt;
  
  if (!refreshToken) {
    res.status(401);
    throw new Error('Not authorized, no refresh token');
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id).select('+refreshToken');

  if (!user || user.refreshToken !== refreshToken) {
    res.status(401);
    throw new Error('Not authorized, token mismatch');
  }

  const tokens = generateTokens(user._id);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  res.cookie('jwt', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken: tokens.accessToken });
});

// @route POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  if (req.user) {
    const user = await User.findById(req.user._id);
    if (user) {
      user.refreshToken = '';
      await user.save();
    }
  }

  res.status(200).json({ message: 'Logged out successfully' });
});

// @route POST /api/auth/create-password
const createPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400);
    throw new Error('Please provide token and password');
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: 'Password created successfully' });
});

// @route POST /api/auth/student/register-step1
const studentRegisterStep1 = asyncHandler(async (req, res) => {
  const { name, email, phone, collegeCode } = req.body;

  if (!name || !email || !phone || !collegeCode) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const college = await College.findOne({ collegeCode: collegeCode.toUpperCase() });
  
  if (!college) {
    res.status(404);
    throw new Error('Invalid College Code');
  }

  let user = await User.findOne({ email });
  if (user && user.isVerified) {
    res.status(400);
    throw new Error('User already exists and is verified. Please log in.');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  console.log(otp)
  if (user) {
     user.name = name;
     user.phone = phone;
     user.collegeId = college._id;
     user.resetToken = hashedOTP;
     user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
     await user.save();
  } else {
     user = await User.create({
       name,
       email,
       phone,
       role: 'STUDENT',
       collegeId: college._id,
       isVerified: false,
       resetToken: hashedOTP,
       resetTokenExpiry: Date.now() + 10 * 60 * 1000
     });
  }


  const message = `Hello ${name},\n\nYour OTP for student registration is: ${otp}\nIt is valid for 10 minutes.`;
  
  await sendEmail({
    email,
    subject: 'Student Registration OTP',
    message
  });

  res.status(200).json({ message: 'OTP sent to email successfully' ,  otp });
});

// @route POST /api/auth/student/verify-otp
const studentVerifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error('Email and OTP are required');
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  const user = await User.findOne({
    email,
    resetToken: hashedOTP,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  res.status(200).json({ message: 'OTP verified successfully' });
});

// @route POST /api/auth/student/setup-password
const studentSetupPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    res.status(400);
    throw new Error('Please provide email, otp, and password');
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  const user = await User.findOne({
    email,
    resetToken: hashedOTP,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.isVerified = true;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();


  const college = await College.findById(user.collegeId);
  const applicationNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();

  await StudentDetails.create({
    user: user._id,
    applicationNumber,
    contactPhone: user.phone
  });


  const message = `Congratulations ${user.name}!\n\nYour registration is successful.\n\nCollege Name: ${college?.collegeName || 'N/A'}\nCollege Code: ${college?.collegeCode || 'N/A'}\nApplication Number: ${applicationNumber}\n\nYou can now log in to the ERP portal.`;
  
  await sendEmail({
    email: user.email,
    subject: 'Registration Successful - Application Details',
    message
  });

  res.status(200).json({ message: 'Password setup and registration complete' });
});

export { register, login, refresh, logout, createPassword, studentRegisterStep1, studentVerifyOTP, studentSetupPassword };
