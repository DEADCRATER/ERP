const asyncHandler = require('express-async-handler');
const StudentDetails = require('../models/StudentDetails');
const College = require('../models/College');

const getMyApplication = asyncHandler(async (req, res) => {
  const applicationId = req.params.id;
  const profile = await StudentDetails.findOne({ _id: applicationId })
    .populate('user', 'name email phone')
    .populate('departmentId', 'name');
  
  if (!profile) {
    res.status(404);
    throw new Error('Student profile not found');
  }

  let college = null;
  if (req.user.collegeId) {
    college = await College.findById(req.user.collegeId).select('collegeName collegeCode collegeEmail collegePhone collegeAddress');
  }

  res.json({ profile, college });
});

const getMyCollegeDepartments = asyncHandler(async (req, res) => {
  const Department = require('../models/Department');
  const departments = await Department.find({ collegeId: req.user.collegeId });
  res.status(200).json({ data: departments });
});

const saveStep1 = asyncHandler(async (req, res) => {
  const profile = await StudentDetails.findOne({ user: req.user._id });
  if (!profile) { res.status(404); throw new Error('Profile not found'); }
  if (profile.isSubmitted) { res.status(400); throw new Error('Application locked'); }

  if(profile.applicationStep  ==  2) {
    res.json({ message: 'Step 1 already completed', data: profile });
  }

  const fields = [
    'name', 'fatherName', 'motherName', 'dob', 'gender', 'category', 
    'domicile', 'nationality', 'aadhar', 'email', 'mobile',
    'address', 'state', 'district', 'pinCode', 'country',
    'course', 'departmentId'
  ];

  fields.forEach(field => {
    if (req.body[field] !== undefined) {
      profile[field] = req.body[field];
    }
  });

  profile.applicationStep = 2;
  await profile.save();
  res.json({ message: 'Step 1 saved', data: profile });
});

const saveStep2 = asyncHandler(async (req, res) => {
  const profile = await StudentDetails.findOne({ user: req.user._id });
  if (!profile) { res.status(404); throw new Error('Profile not found'); }
  if (profile.isSubmitted) { res.status(400); throw new Error('Application locked'); }

  const educationData = typeof req.body.education === 'string' ? JSON.parse(req.body.education) : req.body.education || {};
  
  profile.education = {
    ...profile.education,
    ...educationData
  };

  if (req.files) {
    const docFields = ['tenthMarkSheet', 'twelfthMarkSheet'];
    docFields.forEach(field => {
      if (req.files[field] && req.files[field][0]) {
        profile.documents = profile.documents || {};
        profile.documents[field] = `/uploads/${req.files[field][0].filename}`;
      }
    });
  }

  profile.applicationStep = 3;
  await profile.save();
  res.json({ message: 'Step 2 saved', data: profile });
});

const saveStep3 = asyncHandler(async (req, res) => {
  const profile = await StudentDetails.findOne({ user: req.user._id });
  if (!profile) { res.status(404); throw new Error('Profile not found'); }
  if (profile.isSubmitted) { res.status(400); throw new Error('Application locked'); }

  if (req.files) {
    // Handle Media (Photo, Signature)
    if (req.files.photo && req.files.photo[0]) {
      profile.media = profile.media || {};
      profile.media.photo = `/uploads/${req.files.photo[0].filename}`;
    }
    if (req.files.signature && req.files.signature[0]) {
      profile.media = profile.media || {};
      profile.media.signature = `/uploads/${req.files.signature[0].filename}`;
    }

    // Handle additional Documents
    const docFields = ['migrationCertificate', 'idProof', 'rankCard', 'casteCertificate'];
    docFields.forEach(field => {
      if (req.files[field] && req.files[field][0]) {
        profile.documents = profile.documents || {};
        profile.documents[field] = `/uploads/${req.files[field][0].filename}`;
      }
    });
  }

  profile.applicationStep = 4;
  await profile.save();
  res.json({ message: 'Step 3 saved', data: profile });
});

const saveStep4 = asyncHandler(async (req, res) => {
  const profile = await StudentDetails.findOne({ user: req.user._id });
  if (!profile) { res.status(404); throw new Error('Profile not found'); }
  if (profile.isSubmitted) { res.status(400); throw new Error('Application locked'); }

  const { transactionDate, paymentId, transactionId, feeAmount } = req.body;
  if (transactionDate) profile.transactionDate = transactionDate;
  if (paymentId) profile.paymentId = paymentId;
  if (transactionId) profile.transactionId = transactionId;
  if (feeAmount) profile.feeAmount = feeAmount;

  profile.applicationStep = 5;
  await profile.save();
  res.json({ message: 'Step 4 saved', data: profile });
});

const submitApplication = asyncHandler(async (req, res) => {
  const profile = await StudentDetails.findOne({ user: req.user._id });
  if (!profile) { res.status(404); throw new Error('Profile not found'); }
  if (profile.isSubmitted) { res.status(400); throw new Error('Already submitted'); }

  profile.isSubmitted = true;
  profile.submissionDate = new Date();
  await profile.save();
  res.json({ message: 'Application submitted', data: profile });
});

module.exports = { 
  getMyApplication, 
  getMyCollegeDepartments, 
  saveStep1, 
  saveStep2, 
  saveStep3, 
  saveStep4, 
  submitApplication 
};
