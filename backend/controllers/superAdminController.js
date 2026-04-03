const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const User = require('../models/User');
const College = require('../models/College');
const Department = require("../models/Department");
const SystemConfig = require('../models/SystemConfig');
const sendEmail = require('../utils/sendEmail');

const getPrincipals = asyncHandler(async (req, res) => {
  const principals = await College.find().select('collegeName collegeCode collegeEmail isActive');
  res.json({ count: principals.length, data: principals });
});

const getStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: 'STUDENT' }).select('-password');
  res.json({ count: students.length, data: students });
});

const createPrincipal = asyncHandler(async (req, res) => {
  const {
    collegeName,
    collegeCode,
    collegeEmail,
    collegePhone,
    collegeAddress,
    collegeWebsite,
    adminName,
    adminRole,
    adminEmail,
    adminPhone,
  } = req.body;
  
  if (
    !collegeName || !collegeCode || !collegeEmail || !collegePhone ||
    !collegeAddress || !adminName || !adminRole || !adminEmail ||
    !adminPhone 
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const existingCollege = await College.findOne({ collegeCode });
  if (existingCollege) {
    res.status(400);
    throw new Error("College already exists");
  }

  const college = await College.create({
    collegeName,
    collegeCode,
    collegeEmail,
    collegePhone,
    collegeAddress,
    collegeWebsite
  });

  const user = await User.create({
    name: adminName,
    email: adminEmail,
    role: adminRole,
    phone: adminPhone,
    collegeId: college._id,
    isVerified: false
  });

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const frontendUrl = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
  const customResetUrl = `${frontendUrl}/create-password/${resetToken}`;

  const message = `You have been added as a Principal in the ERP System.\n\nPlease click the link below to set up your password and access your account:\n\n${customResetUrl}\n\nIf you did not request this, please ignore this email.`;

  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Welcome to ERP System - Create your password',
    //   message
    // });
  } catch (err) {
    console.error('Email sending failed:', err);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error('There was an error sending the welcome email. Try again later!');
  }

  res.status(201).json({
    message: "Principal created successfully and activation email sent",
    college,
    user
  });
});

const getMaintenanceStatus = asyncHandler(async (req, res) => {
  let config = await SystemConfig.findOne({ configName: 'main_config' });
  
  if (!config) {
    config = await SystemConfig.create({
      configName: 'main_config',
      isMaintenanceMode: false
    });
  }

  res.json({
    isMaintenanceMode: config.isMaintenanceMode,
    maintenanceMessage: config.maintenanceMessage,
    updatedAt: config.updatedAt
  });
});

const toggleMaintenanceMode = asyncHandler(async (req, res) => {
  const { isMaintenanceMode, maintenanceMessage } = req.body;

  let config = await SystemConfig.findOne({ configName: 'main_config' });

  if (!config) {
    config = await SystemConfig.create({
      configName: 'main_config',
      isMaintenanceMode: isMaintenanceMode || false,
      maintenanceMessage: maintenanceMessage || 'Website is currently under maintenance.',
      updatedBy: req.user._id
    });
  } else {
    config.isMaintenanceMode = isMaintenanceMode !== undefined ? isMaintenanceMode : config.isMaintenanceMode;
    if (maintenanceMessage) config.maintenanceMessage = maintenanceMessage;
    config.updatedBy = req.user._id;
    await config.save();
  }

  res.json({
    message: `Maintenance mode ${config.isMaintenanceMode ? 'enabled' : 'disabled'}`,
    isMaintenanceMode: config.isMaintenanceMode,
    maintenanceMessage: config.maintenanceMessage
  });
});

module.exports = { 
  getPrincipals, 
  getStudents, 
  createPrincipal,
  getMaintenanceStatus,
  toggleMaintenanceMode
};
