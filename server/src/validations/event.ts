import { body, query, param } from "express-validator";
import {
  EVENT_SEARCH_TYPE,
  EVENT_TYPE,
  CONTENT_TYPE,
  RoleData,
} from "../models/Event";
import { VOLUNTEER_TYPE } from "../models/Volunteer";
import { stringEnumValidator,stringArrayValidator } from "./global";

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
function isRoleData(value: any) : value is RoleData {
  const r: RoleData = value
  return typeof r.name === "string"
      && typeof r.description === "string"
      && typeof r.capacity === "number"
      && stringArrayValidator(r.volunteers)
}

const isArrayOfRoleData = (value: Array<any>) => {
  value.every((item) => isRoleData(item));
};

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
const contentType = body("contentType")
  .custom((type: string) =>
    stringEnumValidator(CONTENT_TYPE, "Content type", type)
  )
  .withMessage("Content Type is invalid");
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
  .withMessage("Start date must be after end date")
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
const createdAt = body(
  "createdAt",
  "Time of creation is of wrong date format"
).isISO8601();

// Numeric fields
const vacancies = body("vacancies")
  .exists()
  .withMessage("Vacancy is required")
  .isNumeric()
  .withMessage("Vacancy must be a numeric value");

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
const id = param("id").isString().withMessage("id must be a string");

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
        vacancies,
        description,
        location,
        isCancelled,
        createdAt,

        // Optional fields
        coverImage.optional(),
        facilitatorName.optional(),
        facilitatorDescription.optional(),
        facilitatorPhoto.optional(),
        contentUrl.optional(),
        contentType.optional(),
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
        vacancies.optional(),
        description.optional(),
        location.optional(),
        isCancelled.optional(),
        createdAt.optional(),

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
        query("size").isString().withMessage("Page no must be a string"),
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
