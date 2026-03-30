const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getAllStudents, reviewStudentApplication, createBranch, printStudentData, getDepartmentsAndBranches, getCollegeStats, getDepartments, createDepartment } = require('../controllers/principalController');

router.use(protect);
router.use(authorizeRoles('PRINCIPAL', 'SUPER_ADMIN'));

router.get('/students', getAllStudents);
router.put('/students/:id/review', reviewStudentApplication);
router.get('/students/:id/print', printStudentData);


router.get('/college/:collegeCode/stats', getCollegeStats);

router.get('/college/:collegeId/departments', getDepartments);
router.post('/departments', createDepartment);
router.post('/branches', createBranch);

module.exports = router;



