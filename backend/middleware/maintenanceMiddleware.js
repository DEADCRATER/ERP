import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import SystemConfig from '../models/SystemConfig.js';

/**
 * @desc    Middleware to check if the system is in maintenance mode
 * @access  Public
 */
const checkMaintenanceMode = asyncHandler(async (req, res, next) => {
  // 1. Exclude status check and login/auth routes
  const excludedPaths = [
    '/api/super-admin/maintenance',
    '/api/auth/login',
    '/api/auth/verify-otp',
    '/api/health'
  ];

  if (excludedPaths.some(path => req.originalUrl.startsWith(path))) {
    return next();
  }

  // 2. Fetch maintenance status
  const config = await SystemConfig.findOne({ configName: 'main_config' });
  
  if (config && config.isMaintenanceMode) {
    // 3. Try to check if current requester is Super Admin (even if not fully 'protected' globally)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.id).select('role');
        
        if (user && user.role === 'SUPER_ADMIN') {
          return next();
        }
      } catch (err) {
        // Token invalid or expired - just treat as non-admin
      }
    }

    // 4. Block all other requests
    res.status(503);
    throw new Error(config.maintenanceMessage || 'Website is currently under maintenance. Please try again later.');
  }

  next();
});

export { checkMaintenanceMode };
