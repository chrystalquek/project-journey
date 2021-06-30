import { body } from "express-validator";

type ResourceValidatorMethod = "createResource";

const getValidations = (method: ResourceValidatorMethod) => {
  switch (method) {
    case "createResource": {
      return [
        body("name", "name does not exist").exists(),
        body("url", "url is invalid").isURL(),
        body("type", "type does not exist").exists(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
