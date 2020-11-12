import express from 'express';
import { body, validationResult } from 'express-validator/check';
import { VolunteerData } from '../types';
import { addNewVolunteer, addVolunteerBasedOnSchema } from '../services/volunteer';

import HTTP_CODES from '../constants/httpCodes';

export type VolunteerValidatorMethod = 'createVolunteer' | 'getVolunteer';

const LENGTH_MINIMUM_PASSWORD = 8;

const validate = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case 'createVolunteer': {
      return [
        // Login details
        body('email').isEmail().normalizeEmail(),
        body('password').isString().isLength({
          min: LENGTH_MINIMUM_PASSWORD,
        }),

        // Personal details
        body('name', '"name" is not a string').isString(),
        body('address').isString(),
        body('mobileNumber').isString().isMobilePhone('en-SG'),
        body('birthday').isISO8601().toDate(),
        body('socialMediaPlatform').isString(),
        body('gender').isString(), // Check if male female with custom validator
        body('citizenship').isString(), // Check citizenship enum
        body('race').isString(),
        body('organization').isString(),
        body('position').isString(),
        // body('status').isString(), // Check if 'pending' or 'verified'
        // body('role').isString(), // Check if 'editor' or 'admin'

        // Boolean responses
        body('hasVolunteered').isBoolean(),
        body('hasChildrenExperience').isBoolean(),
        body('hasExternalVolunteerExperience').isBoolean(),
        body('hasFirstAidCertification').isBoolean(),

        // Enum responses
        body('leadershipInterest').isString(), // Check enum ['yes', 'no', 'maybe']
        body('description').isString(), // Check volunteer description
        body('interests').isArray(),
        body('personality').isString(), // Check enum ['INTJ'] types
        body('skills').isArray(),

        // Volunteering related
        body('volunteerReason').isString(), // Categorize answers
        body('volunteerFrequency').isNumeric(), // Frequency per month
        body('volunteerContribution').isString(),

        // Remarks
        body('volunteerRemark').isString(),
      ];
    }
    default:
      return [];
  }
};

const index = async (req: express.Request, res: express.Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.mapped(),
    });
    return;
  }
  await addNewVolunteer(req.body as VolunteerData);
  res.send('Volunteer data created');
};

// TODO: @matt - Implement HOC to prevent boiler plate validation checks for controllers
const createNewVolunteer = async (req: express.Request, res: express.Response) => {
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

export default {
  index,
  validate,
  createNewVolunteer,
};
