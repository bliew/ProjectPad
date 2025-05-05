import express from 'express';
import {
  createProject,
  updateProject,
  getProject,
  getProjects,
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.put('/:id', updateProject);
router.get('', getProjects);
router.get('/:id', getProject);

export default router;
