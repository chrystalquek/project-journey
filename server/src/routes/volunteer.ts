import express, { Router } from 'express';
import volunteerController from '../controllers/volunteer';
import authorize from '../helpers/authorize';
import { validate } from '../validations/global';
import getValidations from '../validations/volunteers';

const router: Router = express.Router();
const protectedRouter: Router = createProtectedRouter(router);

// @route   POST /volunteer
// @desc    For anyone to create new accounts
router.post(
  '/',
  validate(getValidations('createVolunteer')),
  volunteerController.createNewVolunteer,
);

// @route   GET /volunteer/pending
// @desc    For admin to get volunteers who have pending commitment applications
router.get(
  '/pending',
  authorize(['admin']),
  volunteerController.getPendingVolunteers,
);

// @route   GET /volunteer/ids
// @desc    For admin to get volunteers
router.get(
  '/ids',
  authorize(['admin']),
  volunteerController.readVolunteersByIds,
);

// @route   GET /volunteer/:email
// @desc    For volunteer and admin to get volunteer
router.get(
  '/:email',
<<<<<<< HEAD
  authorize([]),
  validate(volunteerController.getValidations('getVolunteer')),
=======
  validate(getValidations('getVolunteer')),
>>>>>>> 9c6015d (Fix validation for volunteers + other nits)
  volunteerController.getVolunteerDetails,
);

// @route   GET /volunteer/id/:id
// @desc    For volunteer and admin to get volunteer
router.get(
  '/id/:id',
  authorize([]),
  volunteerController.getVolunteerDetailsById,
);

// @route   GET /volunteer
// @desc    For admin to get all volunteers
router.get(
  '/',
  authorize(['admin']),
  volunteerController.getAllVolunteerDetails,
);

// @route   DELETE /volunteer/:id
// @desc    For admin to delete volunteer
router.delete(
  '/',
<<<<<<< HEAD
  authorize(['admin']),
  validate(volunteerController.getValidations('deleteVolunteer')),
=======
  validate(getValidations('deleteVolunteer')),
>>>>>>> 9c6015d (Fix validation for volunteers + other nits)
  volunteerController.removeVolunteer,
);

// @route   PUT /volunteer/:id
// @desc    For admin to update volunteer
router.put(
<<<<<<< HEAD
  '/:id',
  authorize([]),
  validate(volunteerController.getValidations('updateVolunteer')),
=======
  '/',
  validate(getValidations('updateVolunteer')),
>>>>>>> 9c6015d (Fix validation for volunteers + other nits)
  volunteerController.updateVolunteer,
);

export default router;
