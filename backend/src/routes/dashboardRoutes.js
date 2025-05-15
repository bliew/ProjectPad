import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
  res.json({
    mesage: `Welcome to your dashboard, ${req.body.username}`,
  });
});

export default router;
