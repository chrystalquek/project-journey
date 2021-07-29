import { body } from "express-validator";
import { existingEmailValidator, passwordValidator } from "./global";

export type UserValidatorMethod = "login" | "updatePassword";

const getValidations = (method: UserValidatorMethod) => {
  switch (method) {
    case "login": {
      return [existingEmailValidator, body("password", "Password must be a string").isString()];
    }
    case "updatePassword": {
      return [existingEmailValidator, passwordValidator];
    }
    default:
      return [];
  }
};

export default getValidations;
