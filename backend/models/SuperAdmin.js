const mongoose = require('mongoose');

const principalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  department: { type: String },
  officeLocation: { type: String },
  contactPhone: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('SuperAdmin', principalSchema);
