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

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp': {
      return [
        body('eventId', 'event id does not exist').exists(),
        body('eventId', 'event id is not a string').isString(),
        body('userId', 'user id does not exist').exists(),
        body('userId', 'user id is not a string').isString(),
        body('status', 'status does not exist').exists(),
        body('status','status is not valid').custom((status: SignUpStatus) => signUpStatusValidator(status)),
        body('preferences', 'preferences does not exist').isArray().notEmpty(),
        body('isRestricted', 'is restricted does not exist').exists(),
        body('isRestricted', 'is restricted is not a boolean value').isBoolean(),
      ];
    }
    case 'updateSignUp': {
      return [
        body('eventId', 'event id is not a string').isString(),
        body('userId', 'user id is not a string').isString(),
        body('status','status is not valid').custom((status: SignUpStatus) => signUpStatusValidator(status)),
        body('preferences', 'preferences does not exist').isArray().notEmpty(),
        body('isRestricted', 'is restricted is not a boolean value').isBoolean(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
