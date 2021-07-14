import { body, query, param } from 'express-validator';
import { EVENT_SEARCH_TYPE, EVENT_TYPE, CONTENT_TYPE, RoleData } from '../models/Event';
import { VOLUNTEER_TYPE } from '../models/Volunteer';
import { stringEnumValidator } from './global';

type EventValidatorMethod = 'createEvent' | 'updateEvent' | 'readEvent' |'readEvents' |'readSignedUpEvents' | 'cancelEvent' | 'deleteEvent';

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
const isRoleData(value: any): value is RoleData =>
(value as RoleData).name !== undefined;


function isArrayOfRoleData(value: Array<any>): boolean {
  return value.every(item => isRoleData(item));
};

// Define validation for each field 
const name = body('name').exists().withMessage('Name is required').isString().withMessage('Name must be a string');
const volunteerType = body('volunteerType').exists().withMessage('Volunteer type is required').custom((volunteerType: string) => stringEnumValidator(
  VOLUNTEER_TYPE,
  'Volunteer Type',
  volunteerType,
)).withMessage('Volunteer type is invalid');
const eventType = body('eventType').exists().withMessage('Event type is required').custom((eventType: string) => stringEnumValidator(
  EVENT_TYPE,
  'Event Type',
  eventType,
)).withMessage('Event type is invalid');
const startDate = body('startDate').exists().withMessage('Start date is required').custom((value, { req }) => value <= req.body.endDate)
  .withMessage('Start date must be after end date')
  .isISO8601()
  .withMessage('Start date is of wrong date format');
const endDate = body('endDate').exists().withMessage('End date is required')
  .isISO8601()
  .withMessage('End date is of wrong date format');
const deadline = body('deadline').exists().withMessage('Deadline is required')
  .isISO8601()
  .withMessage('Deadline is of wrong date format');
const vacancies = body('vacancies').exists().withMessage('Vacancy is required')
  .isNumeric()
  .withMessage('Vacancy must be a numeric value');
const coverImage = body('coverImage', 'cover image is not represented by a string').isString();
const description = body('description').exists().withMessage('Description is required')
.isString().withMessage('Description must be a string');
const facilitatorName = body('facilitatorName')
.isString().withMessage('Facilitator name must be a string');
const facilitatorDescription = body('facilitatorDescription')
.isString().withMessage('Facilitator description must be a string');
const facilitatorPhoto = body('facilitatorPhoto')
.isString().withMessage('Facilitator photo must be represented by a string');
const roles = body('roles').exists().withMessage('Roles is required')
.isArray().withMessage('Roles must be an array')
.custom((roles: any[]) => isArrayOfRoleData(roles)).withMessage('Roles must be an array of RoleData')
.custom((roles: RoleData[]) => roleCapacityValidator(roles)).withMessage('Number of volunteers must not exceed role capacity');
const contentUrl = body('contentUrl').isURL().withMessage('Content URL is invalid');
const contentType = body('contentType').custom((contentType: string) => stringEnumValidator(
  CONTENT_TYPE,
  'Content type',
  contentType,
)).withMessage('Content Type is invalid');
const location = body('location').exists().withMessage('Location is required')
.isString().withMessage('Location must be a string');
const feedbackStatus = body('feedbackStatus').isBoolean().withMessage('Feedback status must be a boolean value');
const isCancelled = body('isCancelled').isBoolean().withMessage('IsCancelled must be a boolean value');
const createdAt = body('createdAt', 'Time of creation is of wrong date format').isISO8601();



const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case 'createEvent': {
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
        roles
      ];
    }
    case 'updateEvent': {
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
        roles.optional()
      ];
    }
    case 'readEvent' : {
      return [
        param('id').isString().withMessage('id must be a string')
      ];
    }

    case 'readEvents' : {
      return [
        param('eventType').custom((eventType: string) => stringEnumValidator(
          EVENT_SEARCH_TYPE,
          'Event Search Type',
          eventType,
        )).withMessage('Event search type is invalid'),
        query('pageNo').isString().withMessage('Page no must be a string'),
        query('size').isString().withMessage('Page no must be a string'),
      ];
    }

    case 'readSignedUpEvents' : {
      return [
        param('userId').isString().withMessage('User id must be a string'),
        param('eventType').custom((eventType: string) => stringEnumValidator(
          EVENT_SEARCH_TYPE,
          'Event Search Type',
          eventType,
        )).withMessage('Event search type is invalid'),
      ];
    }

    case 'cancelEvent' : {
      return [
        param('id').isString().withMessage('id must be a string')
      ];
    }

    case 'deleteEvent' : {
      return [
        param('id').isString().withMessage('id must be a string')
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
