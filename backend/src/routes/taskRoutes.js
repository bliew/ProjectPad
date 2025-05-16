import express from 'express';
import { getTask, getTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/:id', getTask);
router.get('', getTasks);

export default router;
