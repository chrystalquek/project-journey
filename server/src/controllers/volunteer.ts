import express from 'express';
import { body, validationResult } from 'express-validator/check';
import { VolunteerData } from '../types';
import { addNewVolunteer } from '../services/volunteer';

import HTTP_CODES from '../constants/httpCodes';

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

export default {
  index,
  validate,
};
