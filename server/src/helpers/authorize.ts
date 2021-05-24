import jwt from 'express-jwt';
import { accessTokenSecret } from './auth';
import HTTP_CODES from '../constants/httpCodes';
import { VolunteerType } from '../models/Volunteer';

const authorize = (roles: Array<VolunteerType> = []) => [
  jwt({ secret: accessTokenSecret, algorithms: ['HS256'] }),

  // eslint-disable-next-line consistent-return
  (req, res, next) => {
    if (roles.length && !roles.includes(req.user.volunteerType)) {
      return res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    }

    next();
  },
];

export default authorize;
