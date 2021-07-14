import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import _ from 'lodash';
import { doesUserEmailExist } from '../services/volunteer';
import HTTP_CODES from '../constants/httpCodes';

/**
 * Helper function to deal with validation of request body inputs
 * @param enumTypes Array of accepted string values
 * @param enumName Variable name used for identification in error statement
 * @param value String to test out against enumTypes
 */

export const validate = (validations: ValidationChain[]) => async (
  req: Request, res: Response, next: Function,
) => {
  await Promise.all(
    validations.map((validation: ValidationChain) => validation.run(req)),
  );

  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  return res
    .status(HTTP_CODES.UNPROCESSABLE_ENTITIY)
    .json({ errors: validationErrors.array() });
};

export const stringEnumValidator = (
  enumTypes: Readonly<Array<string>>,
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

export const regexValidator = (regexExp: RegExp, regexName: string, value: string) => {
  if (!regexExp.test(value)) {
    throw new Error(`${regexName}: "${value}" must conform with the regex ${regexExp}`);
  }

  return true;
};

export function stringArrayValidator(value: any): boolean {
  return value.every(item => typeof item === "string");
}

// TODO: remove from global after separating user and volunteer
const LENGTH_MINIMUM_PASSWORD = 8;

export const passwordValidator = body('password').isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});

export const existingEmailValidator = body('email')
  .isEmail()
  .normalizeEmail()
  .custom(async (emailString: string) => {
    const isNewEmailUnique = await doesUserEmailExist(emailString);
    if (isNewEmailUnique) {
      throw new Error(`E-mail: ${emailString} does not exist in the system`);
    }
    return true;
  });

export const newEmailValidator = body('email')
  .isEmail()
  .normalizeEmail()
  .custom(async (emailString: string) => {
    const isNewEmailUnique = await doesUserEmailExist(emailString);
    if (!isNewEmailUnique) {
      throw new Error('E-mail is already in use');
    }
    return true;
  });
