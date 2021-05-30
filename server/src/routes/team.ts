import express from 'express';
import teamController from '../controllers/team';
import { validate } from '../validations/global';
import getValidations from '../validations/team';

const router = express.Router();

router.get('/:id?', validate(getValidations('TeamRead')), teamController.readTeam);
router.post('/', validate(getValidations('TeamCreate')), teamController.createTeam);
router.put('/:id', validate(getValidations('TeamUpdate')), teamController.updateTeam);
router.delete('/:id', validate(getValidations('TeamDelete')), teamController.deleteTeam);

export default router;
