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

export default router;
