import express from 'express';
import teamController from '../controllers/team';
import { validate } from '../helpers/validation';

const router = express.Router();

router.get('/:id?', validate(teamController.getValidations('TeamRead')), teamController.readTeam);
router.post('/', validate(teamController.getValidations('TeamCreate')), teamController.createTeam);
router.put('/:id', validate(teamController.getValidations('TeamUpdate')), teamController.updateTeam);
router.delete('/:id', validate(teamController.getValidations('TeamDelete')), teamController.deleteTeam);

export default router;
