const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  enrollmentNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  applicationNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  semester: { type: Number },

  // Personal Details (Step 1)
  name: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER', ''] },
  category: { type: String },
  domicile: { type: String },
  nationality: { type: String, default: 'Indian' },
  aadhar: { type: String },
  email: { type: String },
  mobile: { type: String },

  // Course & College Details (Step 1)
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },

  // Address Details (Step 1)
  address: { type: String },
  state: { type: String },
  district: { type: String },
  pinCode: { type: String },
  country: { type: String, default: 'India' },

  // Education Details (Step 2)
  education: {
    tenthBoard: { type: String },
    tenthYear: { type: String },
    tenthTotalMarks: { type: Number },
    tenthMarks: { type: Number },
    tenthPercentage: { type: Number },
    twelfthBoard: { type: String },
    twelfthYear: { type: String },
    twelfthTotalMarks: { type: Number },
    twelfthMarks: { type: Number },
    twelfthPercentage: { type: Number },
    physicsMarks: { type: Number },
    chemistryMarks: { type: Number },
    mathBioMarks: { type: Number },
    lastCourse: { type: String },
    lastSchool: { type: String },
  },

  // Document & Media Links (Step 2 & 3)
  documents: {
    tenthMarkSheet: { type: String },
    twelfthMarkSheet: { type: String },
    migrationCertificate: { type: String },
    idProof: { type: String },
    rankCard: { type: String },
    casteCertificate: { type: String },
  },
  media: {
    photo: { type: String },
    signature: { type: String },
  },

  // Fee Details (Step 4)
  feeAmount: { type: String, default: '2500' },
  transactionDate: { type: String },
  paymentId: { type: String },
  transactionId: { type: String },
  transactionStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'PENDING'
  },


  // State Tracking
  applicationStep: { type: Number, default: 1 },
  submissionDate: { type: Date },
  admissionDate: { type: Date },
  isSubmitted: { type: Boolean, default: false },

  academicStatus: {
    type: String,
    enum: ['ACTIVE', 'GRADUATED', 'SUSPENDED', 'DROPOUT'],
    default: 'ACTIVE'
  },
  applicationStatus: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'NEEDS_UPDATE'],
    default: 'PENDING'
  },
  reviewMessage: { type: String },
  contactPhone: { type: String },
  address: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentDetails', studentDetailsSchema);
