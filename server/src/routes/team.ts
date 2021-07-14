import express from 'express';
import teamController from '../controllers/team';
import { validate } from '../validations/global';
import getValidations from '../validations/team';

const router = express.Router();

router.get('/:id?', validate(getValidations('readTeam')), teamController.getTeam);
router.post('/', validate(getValidations('createTeam')), teamController.createTeam);
router.put('/:id', validate(getValidations('updateTeam')), teamController.updateTeam);
router.delete('/:id', validate(getValidations('deleteTeam')), teamController.deleteTeam);

export default router;
