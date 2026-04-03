const mongoose = require('mongoose');

const applicationAuditSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentDetails',
    required: true
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['APPROVED', 'REJECTED', 'NEEDS_UPDATE', 'MANUAL_EDIT'],
    required: true
  },
  message: {
    type: String
  },
  changes: {
    type: mongoose.Schema.Types.Mixed // JSON object of before/after or field updates
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ApplicationAudit', applicationAuditSchema);
