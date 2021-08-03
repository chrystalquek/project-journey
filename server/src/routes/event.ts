import express from "express";
import getValidations from "../validations/event";
import eventController from "../controllers/event";
import { validate } from "../validations/global";
import authorize from "../helpers/authorize";

const router = express.Router();

// @route   GET /event/single/:id
// @desc    Get event by id
router.get(
  "/single/:id",
  authorize([]),
  validate(getValidations("readEvent")),
  eventController.getEvent
);

// @route   GET /event/multiple/:eventType
// @desc    Get either all, upcoming, or past events
router.get(
  "/multiple/:eventType",
  authorize([]),
  validate(getValidations("readEvents")),
  eventController.getEvents
);

// @route   GET /event/signup/:userId/:eventType
// @desc    Get either all, upcoming, or past signed up events
router.get(
  "/signup/:userId/:eventType",
  authorize([]),
  validate(getValidations("readSignedUpEvents")),
  eventController.getSignedUpEvents
);

// @route   PUT /event
// @desc    Update a event by id
router.put(
  "/:id",
  authorize(["admin"]),
  validate(getValidations("updateEvent")),
  eventController.updateEvent
);

// @route   PUT /event/cancel/:id
// @desc    Cancel an event by id
router.put(
  "/cancel/:id",
  authorize(["admin"]),
  validate(getValidations("cancelEvent")),
  eventController.cancelEvent
);

// @route   POST /event
// @desc    Post a new event
router.post(
  "/",
  validate(getValidations("createEvent")),
  eventController.createEvent
);

export default router;
