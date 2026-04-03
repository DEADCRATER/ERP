const StudentDetails = require('../models/StudentDetails');
const User = require('../models/User');
const ApplicationAudit = require('../models/ApplicationAudit');
const sendEmail = require('../utils/sendEmail');

/**
 * Update student application data by Principal
 * @param {string} studentId - StudentDetails ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated student record
 */
const updateStudentData = async (studentId, updateData, performedBy) => {
  const student = await StudentDetails.findById(studentId);
  if (!student) {
    throw new Error('Student application not found');
  }

  // Record changes for audit
  const changes = {};
  const allowedFields = [
    'name', 'fatherName', 'motherName', 'dob', 'gender', 'category', 'domicile',
    'nationality', 'aadhar', 'email', 'mobile', 'address', 'state', 'district', 'pinCode', 'country',
    'education', 'contactPhone'
  ];

  // Map incoming data to student record
  Object.keys(updateData).forEach(key => {
    if (allowedFields.includes(key)) {
      if (typeof updateData[key] === 'object' && updateData[key] !== null) {
        changes[key] = { old: student[key], new: updateData[key] };
        student[key] = { ...student[key], ...updateData[key] };
      } else {
        if (student[key] !== updateData[key]) {
          changes[key] = { old: student[key], new: updateData[key] };
          student[key] = updateData[key];
        }
      }
    }
  });

  await student.save();

  // Create Audit Entry
  await ApplicationAudit.create({
    studentId,
    performedBy,
    action: 'MANUAL_EDIT',
    changes
  });

  return student;
};

/**
 * Process student application review (Approve/Reject/Correction)
 * @param {string} studentId - StudentDetails ID
 * @param {string} status - New status (APPROVED, REJECTED, NEEDS_UPDATE)
 * @param {string} message - Feedback message
 * @param {string} performedBy - User ID
 * @returns {Promise<Object>} Updated student record
 */
const processReview = async (studentId, status, message, performedBy) => {
  const student = await StudentDetails.findById(studentId).populate('user');
  if (!student) {
    throw new Error('Student application not found');
  }

  if (!['APPROVED', 'REJECTED', 'NEEDS_UPDATE'].includes(status)) {
    throw new Error('Invalid review status');
  }

  student.applicationStatus = status;
  if (message) {
    student.reviewMessage = message;
  }

  let emailSubject = '';
  let emailMessage = '';

  const studentName = student.user?.name || student.name || 'Student';
  const studentEmail = student.user?.email || student.email;

  if (status === 'APPROVED') {
    if (student.user) {
        student.user.isVerified = true;
        await student.user.save();
    }
    emailSubject = 'Registration Approved - BUHS Patna';
    emailMessage = `Dear ${studentName},\n\nYour registration application has been reviewed and APPROVED by the Principal. You can now access your student portal for further steps.\n\nBest Regards,\nRegistrar Office\nBihar University of Health Sciences, Patna`;
  } else if (status === 'REJECTED') {
    emailSubject = 'Registration Rejected - BUHS Patna';
    emailMessage = `Dear ${studentName},\n\nYour registration application has been reviewed and REJECTED.\n\nReason: ${message || 'Not specified'}\n\nPlease contact the college administration for more details.`;
  } else if (status === 'NEEDS_UPDATE') {
    emailSubject = 'Action Required: Application Needs Correction';
    emailMessage = `Dear ${studentName},\n\nYour registration application requires some corrections as specified by the Principal.\n\nPrincipal's Feedback: ${message || 'Please review and resubmit your details.'}\n\nPlease log in to your dashboard to make the necessary changes.\n\nBest Regards,\nBihar University of Health Sciences, Patna`;
  }

  await student.save();

  // Create Audit Entry
  await ApplicationAudit.create({
    studentId,
    performedBy,
    action: status,
    message
  });

  // Trigger Email (Non-blocking but logged)
  if (studentEmail) {
    sendEmail({
      email: studentEmail,
      subject: emailSubject,
      message: emailMessage,
    }).catch(err => console.error('Failed to send review email:', err));
  }

  return student;
};

module.exports = {
  updateStudentData,
  processReview
};
