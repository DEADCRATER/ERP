import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { 
    getMyApplication, 
    getMyCollegeDepartments,
    saveStep1, 
    saveStep2, 
    saveStep3, 
    saveStep4,
    submitApplication ,
    printStudentData,
    getColleges,
    getCollegesbranch
} from '../controllers/studentController.js';
router.get('/colleges', getColleges);
router.use(protect);
router.use(authorizeRoles('STUDENT','PRINCIPAL'));

router.get('/departments', getMyCollegeDepartments);
router.get('/application/:id', getMyApplication);
router.get('/studentData/:id',printStudentData)
router.get('/collegesbranch', getCollegesbranch);


router.patch('/application/step1', saveStep1);

router.patch('/application/step2', upload.fields([
  { name: 'tenthMarkSheet', maxCount: 1 },
  { name: 'twelfthMarkSheet', maxCount: 1 }
]), saveStep2);

router.patch('/application/step3', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'migrationCertificate', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'rankCard', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 }
]), saveStep3);

router.patch('/application/step4', upload.fields([
  { name: 'feesReceipt', maxCount: 1 }
]), saveStep4);


router.post('/application/submit', submitApplication);

export default router;
