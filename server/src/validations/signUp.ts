import { body } from 'express-validator';
import { SignUpStatus } from '../models/SignUp';
import { checkIfAccepted } from '../services/signUp';

export type SignUpValidatorMethod = 'createSignUp' | 'updateSignUp';

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

function isArrayOfStrings(value: Array<any>): boolean {
  return value.every(item => typeof item === "string");
};

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp': {
      return [
        body('eventId', 'event id does not exist').exists(),
        body('eventId', 'event id is not a string').isString(),
        body('userId', 'user id does not exist').exists(),
        body('userId', 'user id is not a string').isString(),
        body('status', 'status does not exist').exists(),
        body('status', 'status is not valid').custom((status: SignUpStatus) => signUpStatusValidator(status)),
        body('preferences', 'preferences does not exist').exists(),
        body('preferences', 'preferences is not an array').isArray(),
        body('preferences', 'preferences is not an array of string').custom((preferences: any[]) => isArrayOfStrings(preferences)),
        body('isRestricted', 'is restricted does not exist').exists(),
        body('isRestricted', 'is restricted is not a boolean value').isBoolean(),
        body('createdAt', 'createdAt is of wrong date format').isISO8601(),
      ];
    }
    case 'updateSignUp': {
      return [
        body('eventId', 'event id is not a string').optional({ checkFalsy: true }).isString(),
        body('userId', 'user id is not a string').optional({ checkFalsy: true }).isString(),
        body('status', 'status is not valid').custom((status: SignUpStatus) => signUpStatusValidator(status)),
        body('preferences', 'preferences is not an array of string').optional({ checkFalsy: true }).custom((preferences: Array<any>) => isArrayOfStrings(preferences)),
        body('isRestricted', 'is restricted is not a boolean value').optional({ checkFalsy: true }).isBoolean(),
        body('createdAt', 'createdAt is of wrong date format').optional({ checkFalsy: true }).isISO8601(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
