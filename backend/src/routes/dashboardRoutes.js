import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.username}`,
  });
});

export default router;
