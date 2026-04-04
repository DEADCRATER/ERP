import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getAllStudents, reviewStudentApplication, updateStudentData, getStudentHistory, createBranch, printStudentData, getDepartmentsAndBranches, getCollegeStats, getDepartments, createDepartment } from '../controllers/principalController.js';

router.use(protect);
router.use(authorizeRoles('PRINCIPAL', 'SUPER_ADMIN'));

router.get('/students/:course', getAllStudents);
router.put('/students/:id/review', reviewStudentApplication);
router.put('/students/:id/update', updateStudentData);
router.get('/students/:id/history', getStudentHistory);
router.get('/students/:id/print', printStudentData);


router.get('/college/:collegeCode/stats', getCollegeStats);

router.get('/college/:collegeId/departments', getDepartments);
router.post('/departments', createDepartment);
router.post('/branches', createBranch);

export default router;
