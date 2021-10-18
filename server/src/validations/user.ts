import { body } from "express-validator";
import {
  existingEmailValidator,
  newPasswordValidator,
  passwordValidator,
} from "./global";

export type UserValidatorMethod = "login" | "updatePassword" | "resetPassword";

const getValidations = (method: UserValidatorMethod) => {
  switch (method) {
    case "login": {
      return [
        existingEmailValidator(),
        body("password", "Password must be a string").isString(),
      ];
    }
    case "updatePassword": {
      return [existingEmailValidator(), passwordValidator()];
    }
    case "resetPassword": {
      return [newPasswordValidator()];
    }
    default:
      return [];
  }
};

export default getValidations;
