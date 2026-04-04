const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role ${req.user ? req.user.role : 'Unknown'} is not authorized to access this route`);
    }
    next();
  };
};

export { authorizeRoles };
