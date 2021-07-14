import { body, query, param } from 'express-validator';
import { SignUpStatus, SIGN_UP_ID_TYPE } from '../models/SignUp';
import { checkIfAccepted } from '../services/signUp';
import { stringEnumValidator, stringArrayValidator } from './global';

export type SignUpValidatorMethod = 'createSignUp' | 'updateSignUp' | 'getSignUps' | 'deleteSignUp';

const checkIfStatusValid = (value: SignUpStatus) => {
  const isPending = value === 'pending';
  const isRejected = value === 'rejected';
  const isAccepted = checkIfAccepted(value);

  return isPending || isRejected || isAccepted;
};

const signUpStatusValidator = (value: SignUpStatus) => {
  if (checkIfStatusValid(value)) {
    return true;
  }
  throw new Error(
    'status must be either "pending", "rejected", or ["accepted": <acceptedRole>]',
  );
};

// Define validation for each field 
const eventId = body('eventId').exists().withMessage('Event ID is required').isString().withMessage('Volunteer ID must be a string');
const userId = body('userId').exists().withMessage('User ID is required').isString().withMessage('User ID must be a string');
const status = body('status').exists().withMessage('Status is required').custom((status: SignUpStatus) => signUpStatusValidator(status)).withMessage('Status is invalid');
const preferences = body('preferences').exists().withMessage('Preferences are required').isArray().withMessage('Preferences must be an array').custom((preferences: any[]) => stringArrayValidator(preferences)).withMessage('Preferences should be an array of strings');
const isRestricted = body('isRestricted').exists().withMessage('Is restricted is required').isBoolean().withMessage('Is restricted must be a boolean value');
const createdAt = body('createdAt', 'Time of creation is of wrong date format').isISO8601();
const id = param('id').exists().withMessage('ID is required').isString().withMessage('Id must be a string');
const idType = param('idType').exists().withMessage('ID type is required').custom(
  (idType: string) => stringEnumValidator(SIGN_UP_ID_TYPE, 'Sign Up ID Type', idType))
  .withMessage('ID type is invalid');

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp': {
      return [
        eventId,
        userId,
        status,
        preferences,
        isRestricted,
        createdAt,
      ];
    }
    case 'updateSignUp': {
      return [
        eventId.optional(),
        userId.optional(),
        status.optional(),
        preferences.optional(),
        isRestricted.optional(),
        createdAt.optional(),
      ];
    }
    case 'getSignUps': {
      return [
        id,
        idType
      ];
    }
    case 'deleteSignUp': {
      return [
        id,
        idType
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
