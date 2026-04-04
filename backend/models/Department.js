// models/Department.js

import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    totalSeats: {
      type: Number,
      default: 0,
    },
    totalAdmitted: {
      type: Number,
      default: 0,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate department in same college
departmentSchema.index({ name: 1, collegeId: 1 }, { unique: true });

const Department = mongoose.model("Department", departmentSchema);
export default Department;