import express, { Router } from "express";
import volunteerController from "../controllers/volunteer";
import authorize from "../helpers/authorize";
import { validate } from "../validations/global";
import getValidations from "../validations/volunteer";

const router: Router = express.Router();

// @route   POST /volunteer
// @desc    For anyone to create new accounts
router.post(
  "/",
  validate(getValidations("createVolunteer")),
  volunteerController.createVolunteer
);

// @route   GET /volunteer/pending
// @desc    For admin to get volunteers who have pending commitment applications
router.get(
  "/pending",
  authorize(["admin"]),
  volunteerController.getPendingVolunteers
);

// @route   POST /volunteer/ids
// @desc    For admin to get volunteers
// POST is used here to pass in the list of ids in req.body
// https://stackoverflow.com/questions/19637459/rest-api-using-post-instead-of-get
router.post(
  "/ids",
  authorize(["admin"]),
  validate(getValidations('getVolunteersById')),
  volunteerController.getVolunteersByIds

);

// @route   GET /volunteer/:id
// @desc    For volunteer and admin to get volunteer
router.get(
  '/id/:id',
  authorize([]),
  validate(getValidations('getVolunteerById')),
  volunteerController.getVolunteerDetailsById,
);

// @route   GET /volunteer
// @desc    For admin to get all volunteers
router.get(
  '/',
  authorize(['admin']),
  validate(getValidations('getAllVolunteers')),
  volunteerController.getAllVolunteerDetails,

);

// @route   DELETE /volunteer/:id
// @desc    For admin to delete volunteer
router.delete(
  "/",
  validate(getValidations("deleteVolunteer")),
  volunteerController.deleteVolunteer
);

// @route   PUT /volunteer/:id
// @desc    For admin to update volunteer
router.put(
  "/:id",
  validate(getValidations("updateVolunteer")),
  volunteerController.updateVolunteer
);

export default router;
