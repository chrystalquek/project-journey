import { body } from 'express-validator';
import { RoleData } from '../models/Event';
import { EVENT_TYPE, CONTENT_TYPE } from '../models/Event';
import { VOLUNTEER_TYPE } from '../models/Volunteer';
import { stringEnumValidator } from './global';

type EventValidatorMethod = 'createEvent' | 'updateEvent' | 'readEvent';

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
function isOfTypeRoleData(value: object): boolean {
  if ((value as RoleData).type) {
    return true
  }
  return false
};


function isArrayOfRoleData(value: Array<any>): boolean {
  return value.every(item => isOfTypeRoleData(item));
};


const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case 'createEvent': {
      return [
        body('name', 'name does not exist').exists(),
        body('name', 'name is not a string').isString(),
        body('coverImage', 'cover image is not represented by a string').optional({ checkFalsy: true }).isString(),
        body('eventType', 'eventType does not exist').exists(),
        body('eventType', 'eventType is not valid').custom((eventType: string) => stringEnumValidator(
          EVENT_TYPE,
          'Event Type',
          eventType,
        )),
        body('volunteerType', 'volunteerType does not exist').exists(),
        body('volunteerType', 'volunteerType is not valid').custom((volunteerType: string) => stringEnumValidator(
          VOLUNTEER_TYPE,
          'Volunteer Type',
          volunteerType,
        )),
        body('startDate', 'start date does not exist').exists(),
        body('startDate', 'start date is after end date').custom((value, { req }) => value <= req.body.endDate),
        body('startDate', 'start date is of wrong date format').isISO8601(),
        body('endDate', 'end date does not exist').exists(),
        body('endDate', 'end date is of wrong date format').isISO8601(),
        body('deadline', 'deadline does not exist').exists(),
        body('deadline', 'deadline is of wrong date format').isISO8601(),
        body('vacancies', 'vacancy does not exist').exists(),
        body('vacancies', 'vacancy is not a numeric value').isNumeric(),
        body('description', 'description does not exist').exists(),
        body('description', 'description is not a string').isString(),
        body('facilitatorName', 'facilitator name is not a string').optional({ checkFalsy: true }).isString(),
        body('facilitatorDescription', 'facilitator description is not a string').optional({ checkFalsy: true }).isString(),
        body('facilitatorPhoto', 'facilitator photo is not represented by a string').optional({ checkFalsy: true }).isString(),
        body('roles', 'roles does not exist').exists(),
        body('roles', 'roles is not an array').isArray(),
        body('roles', 'roles is not an array of RoleData').custom((roles: any[]) => isArrayOfRoleData(roles)),
        body('roles', 'number of volunteers exceeds role capacity').custom((roles: RoleData[]) => roleCapacityValidator(roles)),
        body('contentUrl', 'content url is invalid').optional({ checkFalsy: true }).isURL(),
        body('contentType', 'content type is invalid').optional({ checkFalsy: true }).custom((contentType: string) => stringEnumValidator(
          CONTENT_TYPE,
          'Content type',
          contentType,
        )),
        body('location', 'location does not exist').exists(),
        body('location', 'location is not a string').isString(),
        body('isCancelled', 'is cancelled is not a boolean value').isBoolean(),
        body('feedbackStatus', 'feedback status is not a boolean value').optional({ checkFalsy: true }).isBoolean(),
        body('createdAt', 'time of creation of wrong date format').isISO8601(),
      ];
    }
    case 'updateEvent': {
      return [
        body('name', 'name is not a string').optional({ checkFalsy: true }).isString(),
        body('coverImage', 'cover image is not represented by a string').optional({ checkFalsy: true }).isString(),
        body('eventType', 'eventType is not valid').optional({ checkFalsy: true }).custom((eventType: string) => stringEnumValidator(
          EVENT_TYPE,
          'Event Type',
          eventType,
        )),
        body('volunteerType', 'volunteerType is not valid').optional({ checkFalsy: true }).custom((volunteerType: string) => stringEnumValidator(
          VOLUNTEER_TYPE,
          'Volunteer Type',
          volunteerType,
        )),
        body('startDate', 'start date is after end date').optional({ checkFalsy: true }).custom((value, { req }) => value <= req.body.endDate),
        body('startDate', 'start date is of wrong date format').optional({ checkFalsy: true }).isISO8601(),
        body('endDate', 'end date is of wrong date format').optional({ checkFalsy: true }).isISO8601(),
        body('deadline', 'deadline is of wrong date format').optional({ checkFalsy: true }).isISO8601(),
        body('vacancies', 'vacancy is not a numeric value').optional({ checkFalsy: true }).isNumeric(),
        body('description', 'description is not a string').optional({ checkFalsy: true }).isString(),
        body('facilitatorName', 'facilitator name is not a string').optional({ checkFalsy: true }).isString(),
        body('facilitatorDescription', 'facilitator description is not a string').optional({ checkFalsy: true }).isString(),
        body('facilitatorPhoto', 'facilitator photo is not represented by a string').optional({ checkFalsy: true }).isString(),
        body('roles', 'roles is not an array').optional({ checkFalsy: true }).isArray(),
        body('roles', 'roles is not an array of RoleData').optional({ checkFalsy: true }).custom((roles: any[]) => isArrayOfRoleData(roles)),
        body('roles', 'number of volunteers exceeds role capacity').custom((roles: RoleData[]) => roleCapacityValidator(roles)),
        body('contentUrl', 'content url is invalid').optional({ checkFalsy: true }).isURL(),
        body('contentType', 'content type is invalid').optional({ checkFalsy: true }).custom((contentType: string) => stringEnumValidator(
          CONTENT_TYPE,
          'Content type',
          contentType,
        )),
        body('location', 'location is not a string').optional({ checkFalsy: true }).isString(),
        body('isCancelled', 'is cancelled is not a boolean value').isBoolean(),
        body('feedbackStatus', 'feedback status is not a boolean value').optional({ checkFalsy: true }).isBoolean(),
        body('createdAt', 'time of creation of wrong date format').isISO8601(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
