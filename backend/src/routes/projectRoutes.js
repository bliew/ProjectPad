import express from 'express';
import {
  createProject,
  updateProject,
  getProject,
  getProjects,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createProject);
router.put('/:id', updateProject);
router.get('', getProjects);
router.get('/:id', getProject);
router.delete('/:id', deleteProject);

export default router;
