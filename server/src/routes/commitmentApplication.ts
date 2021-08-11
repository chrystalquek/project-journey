import express from "express";
import commitmentApplicationController from "../controllers/commitmentApplication";
import getValidations from "../validations/commitmentApplication";
import { validate } from "../validations/global";
import { canCreate, canRead, canUpdate } from "../helpers/authorization";

const router = express.Router();

router.post(
  "/",
  validate(getValidations("createCommitmentApplication")),
  canCreate("commitmentApplication", [
    {
      firstAttribute: "user",
      firstValue: "_id",
      secondAttribute: "body",
      secondValue: "volunteerId",
    },
  ]),
  commitmentApplicationController.createCommitmentApplication
);

router.get(
  "/",
  canRead("commitmentApplication", [
    {
      firstAttribute: "user",
      firstValue: "_id",
      secondAttribute: "query",
      secondValue: "volunteerId",
    },
  ]),
  validate(getValidations("readCommitmentApplication")),
  commitmentApplicationController.getCommitmentApplications
);

// @route   PUT /commitment-application
// @desc    Update a commitmentApplication by id
// @access  Private
router.put(
  "/:id",
  canUpdate("commitmentApplication"),
  validate(getValidations("updateCommitmentApplication")),
  commitmentApplicationController.updateCommitmentApplication
);

export default router;
