const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getPrincipals, getStudents ,createPrincipal} = require('../controllers/superAdminController');

router.use(protect);
router.use(authorizeRoles('SUPER_ADMIN'));

router.get('/principals', getPrincipals);
router.post('/college-admins',createPrincipal);
router.get('/students', getStudents);

module.exports = router;
