import express from 'express';
import volunteerController from '../controllers/volunteer';

const router = express.Router();

router.post(
  '/',
  volunteerController.validate('createVolunteer'),
  volunteerController.createNewVolunteer,
);
router.get(
  '/:email',
  volunteerController.validate('getVolunteer'),
  volunteerController.getVolunteerDetails,
);
router.delete(
  '/',
  volunteerController.validate('deleteVolunteer'),
  volunteerController.removeVolunteer,
);

export default router;
