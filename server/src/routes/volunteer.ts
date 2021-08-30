import express, { Router } from "express";
import volunteerController from "../controllers/volunteer";
import { validate } from "../validations/global";
import getValidations from "../validations/volunteer";
import {
  canDelete,
  canRead,
  canUpdate,
  isNotAdmin,
} from "../helpers/authorization";

const router: Router = express.Router();

// @route   POST /volunteer
// @desc    For anyone to create new accounts
router.post(
  "/",
  // assuming we create a few fixed admin accounts for biab,
  // should only be able to create ad-hoc and commited
  isNotAdmin(),
  validate(getValidations("createVolunteer")),
  volunteerController.createVolunteer
);

// @route   GET /volunteer/pending
// @desc    For admin to get volunteers who have pending commitment applications
router.get(
  "/pending",
  canRead("volunteer"),
  volunteerController.getPendingVolunteers
);

// @route   POST /volunteer/ids
// @desc    For admin to get volunteers
// POST is used here to pass in the list of ids in req.body
// https://stackoverflow.com/questions/19637459/rest-api-using-post-instead-of-get
router.post(
  "/ids",
  canRead("volunteer"),
  validate(getValidations("getVolunteersById")),
  volunteerController.getVolunteersByIds
);

// @route   GET /volunteer/:id
// @desc    For volunteer and admin to get volunteer
router.get(
  "/:id",
  canRead("volunteer", [
    {
      firstAttribute: "user",
      firstValue: "_id",
      secondAttribute: "params",
      secondValue: "id",
    }
  ]),
  validate(getValidations("getVolunteerById")),
  volunteerController.getVolunteerDetailsById
);

// @route   GET /volunteer
// @desc    For admin to get all volunteers
router.get(
  "/",
  canRead("volunteer"),
  validate(getValidations("getAllVolunteers")),
  volunteerController.getAllVolunteerDetails
);

// @route   DELETE /volunteer/:id
// @desc    For admin to delete volunteer
router.delete(
  "/:id",
  canDelete("volunteer"),
  volunteerController.deleteVolunteer
);

// @route   PUT /volunteer/:id
// @desc    For admin to update volunteer
router.put(
  "/:id",
  canUpdate("volunteer", [
    {
      firstAttribute: "user",
      firstValue: "_id",
      secondAttribute: "params",
      secondValue: "id",
    },
    {
      firstAttribute: "user",
      firstValue: "email",
      secondAttribute: "body",
      secondValue: "email",
    },
  ]),
  validate(getValidations("updateVolunteer")),
  volunteerController.updateVolunteer
);

export default router;
