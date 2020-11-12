import express from 'express';
import volunteerController from '../controllers/volunteer';

const router = express.Router();

router.post(
  '/',
  volunteerController.validate('createVolunteer'),
  volunteerController.createNewVolunteer,
);

export default router;
