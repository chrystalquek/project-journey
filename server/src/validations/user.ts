import { body } from "express-validator";
import { email, password } from "./global";

export type UserValidatorMethod = "login" | "updatePassword";

const LENGTH_MINIMUM_PASSWORD = 8;

const newPassword = body("newPassword").isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});

const getValidations = (method: UserValidatorMethod) => {
  switch (method) {
    case "login": {
      return [email(false), password];
    }
    case "updatePassword": {
      return [email(false), password, newPassword];
    }
    default:
      return [];
  }
};

export default getValidations;
