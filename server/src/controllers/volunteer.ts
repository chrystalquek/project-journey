import express from 'express';
import { body, validationResult } from 'express-validator/check';
import { isParameter } from 'typescript';
import { VolunteerData } from '../types';
import { addNewVolunteer, addVolunteerBasedOnSchema } from '../services/volunteer';

import HTTP_CODES from '../constants/httpCodes';
import { getAllFields } from '../services/volunteerSchema';

export type VolunteerValidatorMethod = 'createVolunteer';

const validate = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case 'createVolunteer': {
      return [body('fullName', 'fullName does not exist').exists()];
    }
    default:
      return [];
  }
};

const index = async (req: express.Request, res: express.Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  await addNewVolunteer(req.body as VolunteerData);
  res.send('Volunteer data created');
};

// TODO: @matt - Implement HOC to prevent boiler plate validation checks for controllers
const createNewVolunteer = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  // Checks whether request.data is subset of currentVolunteerSchema
  const currentVolunteerSchemaFields = await getAllFields();
  const volunteerRequestParameters = Object.keys(req.body);

  // TODO: @matt - check param type also (helper function to handle both)
  if (volunteerRequestParameters.every(
    (param) => !!param && currentVolunteerSchemaFields.includes(param),
  )) {
    if (req.body) {
      addVolunteerBasedOnSchema({ ...req.body });
    }
  } else {
    const additionalParameters = volunteerRequestParameters.map(
      (param) => !currentVolunteerSchemaFields.includes(param),
    );

    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: 'Superfluous parameters not supported in schema', // TODO: @matt - standardize error messages
      errors: additionalParameters,
    });
  }
};

export default {
  index,
  validate,
  createNewVolunteer,
};
