const asyncHandler = require('express-async-handler');
const StudentDetails = require('../models/StudentDetails');
const College = require('../models/College');
const Department = require('../models/Department');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const principalService = require('../services/principalService');
const ApplicationAudit = require('../models/ApplicationAudit');

// 
const getAllStudents = asyncHandler(async (req, res) => {
  const { course } = req.params;

  const courseDoc = await Department.findOne({
    name: course,
    collegeId: req.user.collegeId
  });

  console.log('Resolved Course Document:', courseDoc._id.toString());

  const students = await StudentDetails.find({
  Course : courseDoc._id.toString()
})

    .select('applicationNumber category name fatherName mobile submissionDate academicStatus Course user')
    .populate('user', 'name email role')
    .populate({
      path: 'Course',
      select: 'name'
    });

  console.log('Fetched Students:', students);

  res.json({ count: students.length, data: students });
});

const createBranch = asyncHandler(async (req, res) => {
    const { courseName, department, courseType, duration, code, totalSeats } = req.body;
    
    if (!courseName || !department || !courseType || !duration || !code || !totalSeats) {
        res.status(400);
        throw new Error('Please provide all the required fields');
    }

    if (!req.user || !req.user.collegeId) {
        res.status(403);
        throw new Error('Access denied. No college associated with this user.');
    }
    
    const mongoose = require('mongoose');
    let departmentIdStr = department;

    // If "department" is not a valid ObjectId, assume it's a new department name to create.
    if (!mongoose.Types.ObjectId.isValid(department)) {
        let deptDoc = await Department.findOne({ name: department, collegeId: req.user.collegeId });
        if (!deptDoc) {
            deptDoc = await Department.create({ name: department, collegeId: req.user.collegeId });
        }
        departmentIdStr = deptDoc._id;
    }

    const branch = await Branch.create({
        name: courseName,
        departmentId: departmentIdStr,
        collegeId: req.user.collegeId,
        courseType,
        duration,
        code,
        totalSeats
    }); 

    res.status(201).json({ message: 'Branch created successfully', data: branch });
});

const reviewStudentApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, message } = req.body;

    const updatedStudent = await principalService.processReview(id, status, message, req.user._id);

    res.json({ 
        message: `Application ${status.toLowerCase()} successfully and notification sent.`, 
        data: updatedStudent 
    });
});

const updateStudentData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const updatedStudent = await principalService.updateStudentData(id, updateData, req.user._id);

    res.json({ 
        message: 'Student application updated successfully', 
        data: updatedStudent 
    });
});

const printStudentData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const studentOpt = await StudentDetails.findById(id).populate('user', 'name email role phone');
    
    if (!studentOpt) {
        res.status(404);
        throw new Error('Student not found');
    }

    res.json({ data: studentOpt });
});

const getDepartments = asyncHandler(async (req, res) => {
    let { collegeId } = req.params;
    
    // If the user is a Principal, forcefully use their associated collegeId
    // Because the frontend might not have the collegeId in localStorage and might be sending the User ID instead.
    if (req.user && req.user.role === 'PRINCIPAL' && req.user.collegeId) {
        collegeId = req.user.collegeId;
    }
    
    const departments = await Department.find({ collegeId });

    res.status(200).json({
        data: departments,
        message: "Departments fetched successfully"
    });
});

const getDepartmentsAndBranches = asyncHandler(async (req, res) => {
    const { collegeCode } = req.params;
    

    const college = await College.findOne({ collegeCode: collegeCode.toUpperCase() });

    if (!college) {
        res.status(404);
        throw new Error('College not found with the provided code');
    }

    // Fetch Departments for this college
    const departments = await Department.find({ collegeId: college._id });

    // Fetch Branches for this college
    const branches = await Branch.find({ collegeId: college._id }).populate('departmentId', 'name');

    res.json({
        college: {
            name: college.collegeName,
            code: college.collegeCode
        },
        departments,
        branches
    });
});

const getCollegeStats = asyncHandler(async (req, res) => {
    const { collegeCode } = req.params;

    const college = await College.findOne({ collegeCode: collegeCode.toUpperCase() });

    if (!college) {
        res.status(404);
        throw new Error('College not found with the provided code');
    }

    const studentCount = await User.countDocuments({ role: 'STUDENT', collegeId: college._id });
    const departmentCount = await Department.countDocuments({ collegeId: college._id });
    const courseCount = await Branch.countDocuments({ collegeId: college._id });

    res.json({
        college: {
            name: college.collegeName,
            code: college.collegeCode
        },
        stats: {
            students: studentCount,
            departments: departmentCount,
            courses: courseCount
        }
    });
});

const getStudentHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const history = await ApplicationAudit.find({ studentId: id })
        .populate('performedBy', 'name role')
        .sort({ createdAt: -1 });

    res.json({
        message: 'Application history fetched successfully',
        data: history
    });
});
const createDepartment = asyncHandler(async (req, res) => {
  const { name, totalSeats } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error('Department name is required');
  }

  if (!req.user || !req.user.collegeId) {
    res.status(403);
    throw new Error('Access denied. No college associated with this user.');
  }

  const existing = await Department.findOne({
    name: name.trim(),
    collegeId: req.user.collegeId,
  });

  if (existing) {
    res.status(400);
    throw new Error('A department with this name already exists');
  }

  const department = await Department.create({
    name: name.trim(),
    totalSeats: totalSeats ? Number(totalSeats) : 0,
    collegeId: req.user.collegeId,
  });

  res.status(201).json({ message: 'Department created successfully', data: department });
});

module.exports = { getAllStudents, createBranch, createDepartment, reviewStudentApplication, updateStudentData, printStudentData, getDepartmentsAndBranches, getCollegeStats, getDepartments, getStudentHistory };
