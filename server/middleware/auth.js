export const authMiddleware = (req, res, next) => {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  const authHeader = req.headers.authorization;
  const adminKey = req.headers['x-admin-key'];
  const queryKey = req.query.adminKey;

  let providedPassword = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    providedPassword = authHeader.substring(7);
  } else if (adminKey) {
    providedPassword = adminKey;
  } else if (queryKey) {
    providedPassword = queryKey;
  }

  if (!providedPassword || providedPassword !== expectedPassword) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing administrator credentials.',
    });
  }

  next();
};
