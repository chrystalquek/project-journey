import express from "express";
import signUpController from "../controllers/signUp";
import {
  canCreate,
  canDeleteSignUp,
  canRead,
  canReadSignUp,
  canSignUp,
  canUpdateSignUp,
} from "../helpers/authorization";
import { validate } from "../validations/global";
import getValidations from "../validations/signUp";

const router = express.Router();

// @route   POST /signup
// @desc    For volunteers to sign up for an event
router.post(
  "/",
  canCreate("signup", [
    {
      firstAttribute: "user",
      firstValue: "_id",
      secondAttribute: "body",
      secondValue: "userId",
    },
  ]),
  canSignUp(),
  validate(getValidations("createSignUp")),
  signUpController.createSignUp
);

// @route   GET /signup/:id/:idType
// @desc    For admin to read sign ups // @clara
router.get(
  "/:id/:idType",
  canReadSignUp(),
  validate(getValidations("getSignUps")),
  signUpController.getSignUps
);

// @route   GET /signup/pending
// @desc    For admin to read number of pending sign ups
router.get("/pending", canRead("signup"), signUpController.getPendingSignUps);

// @route   DELETE /signup/:id/:idType
// @desc    For volunteers to delete their sign up
router.delete(
  "/:id/:idType",
  canDeleteSignUp(),
  validate(getValidations("deleteSignUp")),
  signUpController.deleteSignUp
);

// @route   PUT /signup/:id/:idType
// @desc    For admin to change status of sign up
router.put(
  "/:id/:idType",
  canUpdateSignUp(),
  validate(getValidations("updateSignUp")),
  signUpController.updateSignUp
);

export default router;
