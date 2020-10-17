import express from 'express';
import teamController from '../controllers/team';
import { validate } from "../controllers/team";

const router = express.Router()

router.get('/:id?', validate("TeamRead"), teamController.readTeam);
router.post('/', validate("TeamCreate"), teamController.createTeam);
router.put('/:id', validate("TeamUpdate"), teamController.updateTeam);
router.delete('/:id', validate("TeamDelete"), teamController.deleteTeam);

export default router;
