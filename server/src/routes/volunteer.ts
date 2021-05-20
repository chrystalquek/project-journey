import express from 'express';
import volunteerController from '../controllers/volunteer';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();

// @route   POST /volunteer
// @desc    For anyone to create new accounts
router.post(
  '/',
  validate(volunteerController.getValidations('createVolunteer')),
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
  authorize([]),
  validate(volunteerController.getValidations('getVolunteer')),
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
  authorize(['admin']),
  validate(volunteerController.getValidations('deleteVolunteer')),
  volunteerController.removeVolunteer,
);

// @route   PUT /volunteer/:id
// @desc    For admin to update volunteer
router.put(
  '/:id',
  authorize([]),
  validate(volunteerController.getValidations('updateVolunteer')),
  volunteerController.updateVolunteer,
);

export default router;
