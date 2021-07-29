import { body, query, param } from "express-validator";
import {
  EVENT_SEARCH_TYPE,
  EVENT_TYPE,
  RoleData,
} from "../models/Event";
import { VOLUNTEER_TYPE } from "../models/Volunteer";
import { stringEnumValidator, id } from "./global";

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
  (value as RoleData).name !== undefined;

const isArrayOfRoleData(value: Array<any>): boolean {
  return value.every((item) => isRoleData(item));
}

// Define validation for each field
// Enum fields
const volunteerType = body("volunteerType")
  .exists()
  .withMessage("Volunteer type is required")
  .custom((type: string) =>
    stringEnumValidator(VOLUNTEER_TYPE, "Volunteer Type", type)
  )
  .withMessage("Volunteer type is invalid");
const eventType = body("eventType")
  .exists()
  .withMessage("Event type is required")
  .custom((type: string) => stringEnumValidator(EVENT_TYPE, "Event Type", type))
  .withMessage("Event type is invalid");
const eventSearchType = param("eventType")
  .custom((type: string) =>
    stringEnumValidator(EVENT_SEARCH_TYPE, "Event Search Type", type)
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
  .isISO8601()
  .withMessage("Deadline is of wrong date format");

// String fields
const name = body("name")
  .exists()
  .withMessage("Name is required")
  .isString()
  .withMessage("Name must be a string");
const coverImage = body(
  "coverImage",
  "cover image is not represented by a string"
).isString();
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
  .withMessage("Facilitator photo must be represented by a string");
const location = body("location")
  .exists()
  .withMessage("Location is required")
  .isString()
  .withMessage("Location must be a string");

// Array fields
const roles = body("roles")
  .exists()
  .withMessage("Roles is required")
  .isArray()
  .withMessage("Roles must be an array")
  .custom((role: any[]) => isArrayOfRoleData(role))
  .withMessage("Roles must be an array of RoleData")
  .custom((role: RoleData[]) => roleCapacityValidator(role))
  .withMessage("Number of volunteers must not exceed role capacity");

// URL fields
const contentUrl = body("contentUrl")
  .isURL()
  .withMessage("Content URL is invalid");

// Boolean fields
const feedbackStatus = body("feedbackStatus")
  .isBoolean()
  .withMessage("Feedback status must be a boolean value");
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
        isCancelled,

        // Optional fields
        coverImage.optional(),
        facilitatorName.optional(),
        facilitatorDescription.optional(),
        facilitatorPhoto.optional(),
        contentUrl.optional(),
        feedbackStatus.optional(),

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
        contentType.optional(),
        feedbackStatus.optional(),

        // Enum validator
        eventType.optional(),
        volunteerType.optional(),
        roles.optional(),
      ];
    }
    case "readEvent": {
      return [id];
    }

    case "readEvents": {
      return [
        eventSearchType,
        query("pageNo").isString().withMessage("Page no must be a string"),
        query("size").isString().withMessage("Size must be a string"),
      ];
    }

    case "readSignedUpEvents": {
      return [
        eventSearchType,
        param("userId").isString().withMessage("User id must be a string"),
      ];
    }

    case "cancelEvent": {
      return [id];
    }

    case "deleteEvent": {
      return [id];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
