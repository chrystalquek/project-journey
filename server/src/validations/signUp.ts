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
    case 'updateSignUp':
    case 'createSignUp': {
      return [
        body('eventId', 'event id does not exist').isString(),
        body('userId', 'user id does not exist').isString(),
        body('status').custom((status: SignUpStatus) => signUpStatusValidator(status)),
        body('preferences', 'preferences does not exist').isArray().notEmpty(),
        body('isRestricted', 'is restricted does not exist').isBoolean(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
