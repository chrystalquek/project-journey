import { VolunteerRole } from './types';

import { accessTokenSecret } from '../helpers/auth';
import HTTP_CODES from '../constants/httpCodes';

const jwt = require('express-jwt');

const authorize = (roles: Array<VolunteerRole> = []) => [
  jwt({ accessTokenSecret, algorithms: ['HS256'] }),

  (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    }

    next();
  },
];

module.exports = authorize;
