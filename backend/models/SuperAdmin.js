import mongoose from 'mongoose';

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

const SuperAdmin = mongoose.model('SuperAdmin', principalSchema);
export default SuperAdmin;
