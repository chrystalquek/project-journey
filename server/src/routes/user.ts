import express from "express";
import userController from "../controllers/user";
import { canUpdate } from "../helpers/authorization";
import { validate } from "../validations/global";
import getValidations from "../validations/user";

const router = express.Router();

// @route   POST /user/login
// @desc    For volunteers and admins to login
router.post("/login", validate(getValidations("login")), userController.login);

// @route   POST /user/password
// @desc    For volunteers and admins to change their password
router.post(
  "/password",
  canUpdate("user", [
    {
      firstAttribute: "user",
      firstValue: "email",
      secondAttribute: "body",
      secondValue: "email",
    },
  ]),
  validate(getValidations("updatePassword")),
  userController.updatePassword
);

export default router;
