import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwtUtils.js';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Not authorized, invalid or expired token' });
  }
};
