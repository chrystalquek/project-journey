import { body, param } from "express-validator";
import { SIGN_UP_ID_TYPE, SIGN_UP_STATUS } from "../models/SignUp";
import { stringEnumValidator, stringArrayValidator, idInParam } from "./global";

export type SignUpValidatorMethod =
  | "createSignUp"
  | "updateSignUp"
  | "getSignUps"
  | "deleteSignUp";

// Define validation for each field
const eventId = () => body("eventId")
  .exists({ checkFalsy: true })
  .withMessage("Event ID is required")
  .isString()
  .withMessage("Event ID must be a string");
const userId = () => body("userId")
  .exists({ checkFalsy: true })
  .withMessage("User ID is required")
  .isString()
  .withMessage("User ID must be a string");
const status = () => body("status")
  .exists()
  .withMessage("Status is required")
  .custom((value: string) =>
    stringEnumValidator(SIGN_UP_STATUS, "Sign Up Status", value)
  )
  .withMessage("Status is invalid");
const acceptedRole = () => body(
  "status",
  "Accepted role must be a string"
).isString();
const preferences = () => body("preferences")
  .exists()
  .withMessage("Preferences are required")
  .isArray()
  .withMessage("Preferences must be an array")
  .custom((value: any[]) => stringArrayValidator(value))
  .withMessage("Preferences should be an array of strings");
const isRestricted = () => body("isRestricted")
  .exists()
  .withMessage("Is restricted is required")
  .isBoolean()
  .withMessage("Is restricted must be a boolean value");
const idType = () => param("idType")
  .exists()
  .withMessage("ID type is required")
  .custom((value: string) =>
    stringEnumValidator(SIGN_UP_ID_TYPE, "Sign Up ID Type", value)
  )
  .withMessage("ID type is invalid");

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case "createSignUp": {
      return [eventId(), userId(), status(), acceptedRole(), preferences(), isRestricted()];
    }
    case "updateSignUp": {
      return [
        eventId().optional(),
        userId().optional(),
        status().optional(),
        acceptedRole().optional(),
        preferences().optional(),
        isRestricted().optional(),
      ];
    }
    case "getSignUps": {
      return [idInParam(), idType()];
    }
    case "deleteSignUp": {
      return [idInParam(), idType()];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
