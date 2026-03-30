// models/College.js

const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },

    collegeCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    collegeEmail: {
      type: String,
      required: true,
      lowercase: true,
    },

    collegePhone: {
      type: String,
      required: true,
    },

    collegeAddress: {
      type: String,
      required: true,
    },

    collegeWebsite: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);