import { body } from 'express-validator';
import { existingEmailValidator, passwordValidator } from './global';

export type UserValidatorMethod = 'login' | 'updatePassword'

const LENGTH_MINIMUM_PASSWORD = 8;

const newPasswordValidator = body('newPassword').isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});

const getValidations = (method: UserValidatorMethod) => {
  switch (method) {
    case 'login': {
      return [
        existingEmailValidator,
        passwordValidator,
      ];
    }
    case 'updatePassword': {
      return [
        existingEmailValidator,
        passwordValidator,
        newPasswordValidator,
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
