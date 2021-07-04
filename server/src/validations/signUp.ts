import { body } from "express-validator";
import { SIGN_UP_STATUS } from "../models/SignUp";
import { stringEnumValidator } from "./global";

export type SignUpValidatorMethod = "createSignUp" | "updateSignUp";

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case "updateSignUp":
    case "createSignUp": {
      return [
        body("eventId", "event id does not exist").isString(),
        body("userId", "user id does not exist").isString(),
        body("status").custom((status) =>
          stringEnumValidator(SIGN_UP_STATUS, "Sign up status", status)
        ),
        body("preferences", "preferences does not exist").isArray().notEmpty(),
        body("isRestricted", "is restricted does not exist").isBoolean(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
