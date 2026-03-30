const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },

  password: { 
    type: String,
    select: false 
  },

  role: { 
    type: String, 
    enum: ['SUPER_ADMIN', 'PRINCIPAL', 'STUDENT'], 
    required: true 
  },

  phone: {
    type: String
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College'
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  // 🔐 Password setup / reset system
  resetToken: {
    type: String,
    select: false
  },

  resetTokenExpiry: {
    type: Date
  },

  refreshToken: { 
    type: String,
    select: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);