import { body } from 'express-validator';
import { RoleData } from '../types';

type EventValidatorMethod = 'createEvent';

const roleCapacityValidator = (roles: Array<RoleData>) => {
  for (let i = 0; i < roles.length; i += 1) {
    const currRole = roles[i];
    if (currRole.capacity < currRole.volunteers.length) {
      return false;
    }
  }
  return true;
};

const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case 'createEvent': {
      return [
        body('name', 'name does not exist').exists(),
        body('description', 'description does not exist').exists(),
        body('contentUrl', 'content url is invaßlid').optional({ checkFalsy: true }).isURL(),
        body('facilitatorName', 'facilitator name does not exist').optional({ checkFalsy: true }).isString(),
        body('facilitatorDescription', 'facilitator description is not a string').optional({ checkFalsy: true }).isString(),
        body('startDate', 'start date does not exist').exists(),
        body('startDate', 'start date is after end date').custom((value, { req }) => value <= req.body.endDate),
        body('startDate', 'start date is of wrong date format').isISO8601(),
        body('endDate', 'end date does not exist').exists(),
        body('endDate', 'end date is of wrong date format').isISO8601(),
        body('deadline', 'deadline does not exist').exists(),
        body('deadline', 'deadline is of wrong date format').isISO8601(),
        body('roles', 'roles is not an array').optional({ checkFalsy: true }).isArray(),
        body('roles', 'number of volunteers exceeds role capacity').custom((roles: RoleData[]) => roleCapacityValidator(roles)),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
