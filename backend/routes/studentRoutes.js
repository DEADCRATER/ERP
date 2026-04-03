const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
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
} = require('../controllers/studentController');
router.get('/colleges', getColleges);
router.use(protect);
router.use(authorizeRoles('STUDENT','PRINCIPAL'));

router.get('/departments', getMyCollegeDepartments);
router.get('/application/:id', getMyApplication);
router.get('/studentData/:id',printStudentData)
router.get('/collegesbranch', getCollegesbranch);


router.put('/application/step1', saveStep1);

router.put('/application/step2', upload.fields([
  { name: 'tenthMarkSheet', maxCount: 1 },
  { name: 'twelfthMarkSheet', maxCount: 1 }
]), saveStep2);

router.put('/application/step3', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'migrationCertificate', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'rankCard', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 }
]), saveStep3);

router.put('/application/step4', saveStep4);

router.post('/application/submit', submitApplication);

module.exports = router;
