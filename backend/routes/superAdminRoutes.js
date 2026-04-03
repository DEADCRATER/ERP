const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { 
  getPrincipals, 
  getStudents, 
  createPrincipal,
  getMaintenanceStatus,
  toggleMaintenanceMode
} = require('../controllers/superAdminController');

// 🛠 Public Maintenance Status Check
router.get('/maintenance', getMaintenanceStatus);

router.use(protect);
router.use(authorizeRoles('SUPER_ADMIN'));

router.get('/principals', getPrincipals);
router.post('/college-admins', createPrincipal);
router.get('/students', getStudents);

// 🛠 Protected Maintenance Update
router.patch('/maintenance', toggleMaintenanceMode);

module.exports = router;
