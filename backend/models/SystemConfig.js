import mongoose from 'mongoose';

const systemConfigSchema = new mongoose.Schema({
  configName: {
    type: String,
    required: true,
    unique: true,
    default: 'main_config'
  },
  isMaintenanceMode: {
    type: Boolean,
    required: true,
    default: false
  },
  maintenanceMessage: {
    type: String,
    default: 'Website is currently under maintenance. Please try again later.'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const SystemConfig = mongoose.model('SystemConfig', systemConfigSchema);
export default SystemConfig;
