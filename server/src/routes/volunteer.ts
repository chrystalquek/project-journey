import express from 'express';
import volunteerController from '../controllers/volunteer';
import { validate } from '../helpers/validation';

const router = express.Router();

router.post(
  '/',
  validate(volunteerController.getValidations('createVolunteer')),
  volunteerController.createNewVolunteer,
);
router.get(
  '/:email',
  validate(volunteerController.getValidations('getVolunteer')),
  volunteerController.getVolunteerDetails,
);
router.get(
  '/',
  volunteerController.getAllVolunteerDetails,
);
router.delete(
  '/',
  validate(volunteerController.getValidations('deleteVolunteer')),
  volunteerController.removeVolunteer,
);
router.put(
  '/',
  validate(volunteerController.getValidations('updateVolunteer')),
  volunteerController.updateVolunteer,
);

export default router;
