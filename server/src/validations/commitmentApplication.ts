import { body, query, ValidationChain } from "express-validator";
import { COMMITMENT_APPLICATION_STATUS } from "../models/CommitmentApplication";
import { stringEnumValidator, idInParam } from "./global";

type CommitmentApplicationValidatorMethod =
  | "createCommitmentApplication"
  | "readCommitmentApplication"
  | "updateCommitmentApplication";

// Define validation for each field
const volunteerId = body("volunteerId")
  .exists({ checkFalsy: true })
  .withMessage("Volunteer ID is required")
  .isString()
  .withMessage("Volunteer ID must be a string");
const status = body("status")
  .custom((value: string) =>
    stringEnumValidator(
      COMMITMENT_APPLICATION_STATUS,
      "Commitment Application Status",
      value
    )
  )
  .withMessage("Status is not valid");

export const getValidations = (
  method: CommitmentApplicationValidatorMethod
): ValidationChain[] => {
  switch (method) {
    case "createCommitmentApplication": {
      return [volunteerId];
    }
    case "updateCommitmentApplication": {
      return [idInParam, volunteerId, status.optional()];
    }
    case "readCommitmentApplication": {
      return [
        query("status")
          .custom((value: string) =>
            stringEnumValidator(
              COMMITMENT_APPLICATION_STATUS,
              "Commitment Application Status",
              value
            )
          )
          .withMessage("Status is not valid")
          .optional(),
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
