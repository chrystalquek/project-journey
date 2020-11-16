import express from 'express';
import _ from 'lodash';
import { body, param, validationResult } from 'express-validator/check';
import { VolunteerData } from '../types';
import {
  addNewVolunteer, deleteVolunteer, getVolunteer, isUserEmailUnique,
} from '../services/volunteer';

import HTTP_CODES from '../constants/httpCodes';
import {
  CITIZENSHIP_TYPES,
  GENDER_TYPES,
  LEADERSHIP_INTEREST_TYPES,
  PERSONALITY_TYPES,
  RACE_TYPES,
  SOCIAL_MEDIA_PLATFORMS,
} from '../models/Volunteer';

export type VolunteerValidatorMethod = 'createVolunteer' | 'getVolunteer' | 'deleteVolunteer'

const LENGTH_MINIMUM_PASSWORD = 8;

/**
 * Helper function to deal with validation of request body inputs
 * @param enumTypes Array of accepted string values
 * @param enumName Variable name used for identification in error statement
 * @param value String to test out against enumTypes
 */
const stringEnumValidator = (enumTypes: Array<string>, enumName: string, value: string) => {
  if (!_.includes(enumTypes, value)) {
    throw new Error(`${enumName}: "${value}" must be either ${enumTypes.join(', ')}`);
  }
  return true;
};

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */
const validate = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case 'createVolunteer': {
      return [
        // Login details
        body('email').isEmail().normalizeEmail().custom(async (email: string) => {
          const isEmailUnique = await isUserEmailUnique(email);
          if (!isEmailUnique) {
            throw new Error('E-mail is already in use');
          }
          return true;
        }),
        body('password').isString().isLength({
          min: LENGTH_MINIMUM_PASSWORD,
        }),

        // Personal details
        body('name').isString(),
        body('address').isString(),
        body('mobileNumber').isString().isMobilePhone('en-SG'),
        body('birthday').isISO8601().toDate(),
        body('socialMediaPlatform').isString().custom(
          (socialMedia: string) => stringEnumValidator(SOCIAL_MEDIA_PLATFORMS, 'Social Media Platform', socialMedia),
        ),
        body('gender').custom((gender: string) => stringEnumValidator(GENDER_TYPES, 'Gender', gender)),
        body('citizenship').custom(
          (citizenship: string) => stringEnumValidator(CITIZENSHIP_TYPES, 'Citizenship', citizenship),
        ),
        body('race').custom((race: string) => stringEnumValidator(RACE_TYPES, 'Race', race)),
        body('organization').isString(),
        body('position').isString(),

        // Boolean responses
        body('hasVolunteered').isBoolean(),
        body('hasChildrenExperience').isBoolean(),
        body('hasExternalVolunteerExperience').isBoolean(),
        body('hasFirstAidCertification').isBoolean(),

        // Enum responses
        body('leadershipInterest').isString().custom(
          (leadershipInterest: string) => stringEnumValidator(
            LEADERSHIP_INTEREST_TYPES, 'Leadership Interest', leadershipInterest,
          ),
        ),
        body('description').isString(),
        body('interests').isArray(),
        body('personality').isString().custom(
          (personality: string) => stringEnumValidator(PERSONALITY_TYPES, 'Personality', personality),
        ),
        body('skills').isArray(),

        // Volunteering related
        body('volunteerReason').isString(), // Categorize answers
        body('volunteerFrequency').isNumeric(), // Frequency per month
        body('volunteerContribution').isString(),

        // Remarks
        body('volunteerRemark').isString().optional(),
      ];
    }
    case 'getVolunteer': {
      return [
        param('email').isEmail(),
      ];
    }
    case 'deleteVolunteer': {
      return [
        body('email').isEmail(),
      ];
    }
    default:
      return [];
  }
};

const createNewVolunteer = async (req: express.Request, res: express.Response) => {
  // TODO: Move to middleware
  // https://express-validator.github.io/docs/running-imperatively.html
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: validationErrors.array(),
    });
    return;
  }

  try {
    await addNewVolunteer(req.body as VolunteerData);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

const getVolunteerDetails = async (req: express.Request, res: express.Response) => {
  // TODO: Move to middleware
  // https://express-validator.github.io/docs/running-imperatively.html
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: validationErrors.array(),
    });
    return;
  }

  try {
    const volunteerDetails = await getVolunteer(req.params.email);
    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const removeVolunteer = async (req: express.Request, res: express.Response) => {
  // TODO: Move to middleware
  // https://express-validator.github.io/docs/running-imperatively.html
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: validationErrors.array(),
    });
    return;
  }

  try {
    const { email } = req.body;
    await deleteVolunteer(email);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

export default {
  validate,
  createNewVolunteer,
  getVolunteerDetails,
  removeVolunteer,
};
