// models/Branch.js

const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true, // helps faster queries
    },

    courseType: {
      type: String,
      enum: ['UG', 'PG', 'DIPLOMA', 'PHD'],
      default: 'UG',
    },

    duration: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate branch in same department
branchSchema.index(
  { name: 1, departmentId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Branch", branchSchema);