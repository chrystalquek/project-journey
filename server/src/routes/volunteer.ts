import express from 'express';
import volunteerController from '../controllers/volunteer';
import { createProtectedRouter } from '../helpers/auth';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

router.post(
  '/',
  validate(volunteerController.getValidations('createVolunteer')),
  volunteerController.createNewVolunteer,
);

protectedRouter.get(
  '/pending',
  authorize(['admin']),
  volunteerController.getPendingVolunteers,
);

router.post(
  '/ids',
  volunteerController.readVolunteersByIds,
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
  volunteerController.checkUpdateRights(),
  validate(volunteerController.getValidations('updateVolunteer')),
  volunteerController.updateVolunteer,
);

export default router;
