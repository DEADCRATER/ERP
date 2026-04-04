import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { 
  getPrincipals, 
  getStudents, 
  createPrincipal,
  getMaintenanceStatus,
  toggleMaintenanceMode
} from '../controllers/superAdminController.js';

// 🛠 Public Maintenance Status Check
router.get('/maintenance', getMaintenanceStatus);

router.use(protect);
router.use(authorizeRoles('SUPER_ADMIN'));

router.get('/principals', getPrincipals);
router.post('/college-admins', createPrincipal);
router.get('/students', getStudents);

// 🛠 Protected Maintenance Update
router.patch('/maintenance', toggleMaintenanceMode);

export default router;
