import { body } from 'express-validator';
import { doesUserEmailExist } from '../services/volunteer';

/**
 * Helper function to deal with validation of request body inputs
 * @param enumTypes Array of accepted string values
 * @param enumName Variable name used for identification in error statement
 * @param value String to test out against enumTypes
 */
export const stringEnumValidator = (
  enumTypes: Array<string>,
  enumName: string,
  value: string,
) => {
  if (!_.includes(enumTypes, value)) {
    throw new Error(
      `${enumName}: "${value}" must be either ${enumTypes.join(', ')}`,
    );
  }
  return true;
};

export const regexValidator = (regexExp: RegExp, regexName : string, value: string) => {
  if (!regexExp.test(value)) {
    throw new Error(`${regexName}: "${value}" must conform with the regex ${regexExp}`);
  }

  return true;
};

// TODO: remove from global after separating user and volunteer
const LENGTH_MINIMUM_PASSWORD = 8;

export const password = body('password').isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});

export const email = (emailMustBeUnique: boolean) => body('email')
  .isEmail()
  .normalizeEmail()
  .custom(async (emailString: string) => {
    const isNewEmailUnique = await doesUserEmailExist(emailString);
    if (!isNewEmailUnique && emailMustBeUnique) {
      throw new Error('E-mail is already in use');
    }

    if (isNewEmailUnique && !emailMustBeUnique) {
      throw new Error(`E-mail: ${emailString} does not exist in the system`);
    }

    return true;
  });
