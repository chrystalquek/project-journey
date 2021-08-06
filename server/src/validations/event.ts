import { body, query, param } from "express-validator";
import _ from "lodash";
import { EVENT_SEARCH_TYPE, EVENT_TYPE, RoleData } from "../models/Event";
import { VOLUNTEER_TYPE } from "../models/Volunteer";
import { stringEnumValidator, stringArrayValidator, idInParam } from "./global";

type EventValidatorMethod =
  | "createEvent"
  | "updateEvent"
  | "readEvent"
  | "readEvents"
  | "readSignedUpEvents"
  | "cancelEvent"
  | "deleteEvent";

const roleCapacityValidator = (roles: Array<RoleData>) => {
  for (let i = 0; i < roles.length; i += 1) {
    const currRole = roles[i];
    if (currRole.capacity < currRole.volunteers.length) {
      return false;
    }
  }
  return true;
};

// check if the data is of custom type RoleData

const isRoleData = (value: any): value is RoleData =>
  typeof value.name === "string" &&
  typeof value.description === "string" &&
  typeof value.capacity === "number" &&
  stringArrayValidator(value.volunteers);

const isArrayOfRoleData = (value: any[]) =>
  value.every((item) => isRoleData(item));

// Define validation for each field
// Enum fields
const volunteerType = body("volunteerType")
  .exists()
  .withMessage("Volunteer type is required")
  .custom((value: string) =>
    stringEnumValidator(VOLUNTEER_TYPE, "Volunteer Type", value)
  )
  .withMessage("Volunteer type is invalid");
const eventType = body("eventType")
  .exists()
  .withMessage("Event type is required")
  .custom((value: string) =>
    stringEnumValidator(EVENT_TYPE, "Event Type", value)
  )
  .withMessage("Event type is invalid");
const eventSearchType = param("eventType")
  .custom((value: string) =>
    stringEnumValidator(EVENT_SEARCH_TYPE, "Event Search Type", value)
  )
  .withMessage("Event search type is invalid");

// Date time fields
const startDate = body("startDate")
  .exists()
  .withMessage("Start date is required")
  .custom((value, { req }) => value <= req.body.endDate)
  .withMessage("Start date must be before end date")
  .isISO8601()
  .withMessage("Start date is of wrong date format");
const endDate = body("endDate")
  .exists()
  .withMessage("End date is required")
  .isISO8601()
  .withMessage("End date is of wrong date format");
const deadline = body("deadline")
  .exists()
  .withMessage("Deadline is required")
  .custom((value, { req }) => value <= req.body.startDate)
  .withMessage("Deadline must be before start date")
  .isISO8601()
  .withMessage("Deadline is of wrong date format");

// String fields
const name = body("name")
  .exists()
  .withMessage("Name is required")
  .isString()
  .withMessage("Name must be a string")
  .notEmpty()
  .withMessage("Name cannot be empty");
const coverImage = body(
  "coverImage",
  "cover image must be represented by a string"
)
  .isString()
  .isURL()
  .withMessage("Cover image must be represented by a URL");
const description = body("description")
  .exists()
  .withMessage("Description is required")
  .isString()
  .withMessage("Description must be a string");
const facilitatorName = body("facilitatorName")
  .isString()
  .withMessage("Facilitator name must be a string");
const facilitatorDescription = body("facilitatorDescription")
  .isString()
  .withMessage("Facilitator description must be a string");
const facilitatorPhoto = body("facilitatorPhoto")
  .isString()
  .withMessage("Facilitator photo must be represented by a string")
  .isURL()
  .withMessage("Facilitator photo must be represented by a URL");
const location = body("location")
  .exists()
  .withMessage("Location is required")
  .isString()
  .withMessage("Location must be a string")
  .notEmpty()
  .withMessage("Location cannot be empty");

// Array fields
const roles = body("roles")
  .exists()
  .withMessage("Roles is required")
  .isArray()
  .withMessage("Roles must be an array")
  .if((value: any[]) => !_.isEmpty(value)) // Run the following validations only if the array is non-empty.
  .custom((value: any[]) => isArrayOfRoleData(value))
  .withMessage("Roles must be an array of RoleData")
  .custom((value: RoleData[]) => roleCapacityValidator(value))
  .withMessage("Number of volunteers must not exceed role capacity");

// URL fields
const contentUrl = body("contentUrl")
  .isURL()
  .withMessage("Content URL is invalid");

// Boolean fields
const isCancelled = body("isCancelled")
  .isBoolean()
  .withMessage("IsCancelled must be a boolean value");

const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case "createEvent": {
      return [
        name,
        startDate,
        endDate,
        deadline,
        description,
        location,

        // Optional fields
        coverImage.optional(),
        facilitatorName.optional(),
        facilitatorDescription.optional(),
        facilitatorPhoto.optional(),
        contentUrl.optional(),

        // Enum validator
        eventType,
        volunteerType,
        roles,
      ];
    }
    case "updateEvent": {
      return [
        name.optional(),
        startDate.optional(),
        endDate.optional(),
        deadline.optional(),
        description.optional(),
        location.optional(),
        isCancelled.optional(),

        // Optional fields
        coverImage.optional(),
        facilitatorName.optional(),
        facilitatorDescription.optional(),
        facilitatorPhoto.optional(),
        contentUrl.optional(),

        // Enum validator
        eventType.optional(),
        volunteerType.optional(),
        roles.optional(),
      ];
    }
    case "readEvent": {
      return [idInParam];
    }

    case "readEvents": {
      return [
        eventSearchType,
        query("pageNo")
          .isInt({ min: 0 })
          .withMessage("Page number must be a non-negative integer")
          .isString()
          .withMessage("Page number must be a string")
          .optional(),
        query("size")
          .isInt({ min: 0 })
          .withMessage("Size must be a non-negative integer")
          .isString()
          .withMessage("Size must be a string")
          .optional(),
      ];
    }

    case "readSignedUpEvents": {
      return [
        eventSearchType,
        param("userId").isString().withMessage("User id must be a string"),
      ];
    }

    case "cancelEvent": {
      return [idInParam];
    }

    case "deleteEvent": {
      return [idInParam];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
