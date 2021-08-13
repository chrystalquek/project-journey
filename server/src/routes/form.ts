import { Router } from "express";
import { validate } from "../validations/global";
import formController from "../controllers/form";
import getValidations from "../validations/form";
import { authorize, canAnswerFormQuestions } from "../helpers/authorization";

const router = Router();

// Add authz
router.post(
  "/",
  authorize(),
  validate(getValidations("createForm")),
  formController.createForm
);
router.get(
  "/:eventId",
  authorize(),
  validate(getValidations("getFormDetails")),
  formController.getEventFormDetails
);
router.post(
  "/answer",
  canAnswerFormQuestions(),
  validate(getValidations("answerForm")),
  formController.answerFormQuestions
);

export default router;
