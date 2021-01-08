import jwt from 'express-jwt';
import { VolunteerType } from '../types';

import { accessTokenSecret } from '../helpers/auth';
import HTTP_CODES from '../constants/httpCodes';
import config from '../config';

// TODO not sure how this function works... is this the correct modification?
const authorize = (roles: Array<VolunteerType> = []) => {
  if (config.disableAuthentication && config.env !== 'production') {
    return [];
  }
  return [
    jwt({ secret: accessTokenSecret, algorithms: ['HS256'] }),

    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.volunteerType)) {
        return res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      }

      next();
    },
  ];
};

export default authorize;
