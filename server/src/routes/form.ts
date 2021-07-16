import { Router } from "express";
import { validate } from "../validations/global";
import formController from "../controllers/form";
import getValidations from "../validations/form";

const router = Router();

// Add authz
router.post(
  "/",
  validate(getValidations("createForm")),
  formController.createForm
);
router.get(
  "/:eventId",
  validate(getValidations("getFormDetails")),
  formController.getEventFormDetails
);
router.post(
  "/answer",
  validate(getValidations("answerForm")),
  formController.answerFormQuestions
);

export default router;
