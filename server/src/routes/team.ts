import express from 'express';
import teamController from '../controllers/team';

const router = express.Router()

router.get('/:id', teamController.readTeam);
router.post('/', teamController.createTeam);
router.put('/', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

export default router;
