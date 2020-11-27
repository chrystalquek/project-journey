import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator/check';
import { getUser, readAllUsers } from '../services/user';

import HTTP_CODES from '../constants/httpCodes';
import { accessTokenSecret } from '../helpers/auth';
import VALIDATOR from '../helpers/validation';

export type UserValidatorMethod = 'login'

const validate = (method: UserValidatorMethod) => {
  switch (method) {
    case 'login': {
      return [
        VALIDATOR.email(false),
        VALIDATOR.password,
      ];
    }
    default:
      return [];
  }
};

const getAllUsers = async (req: express.Request, res: express.Response) => {
  const users = await readAllUsers();
  res.json({
    users,
  });
};

const login = async (req: express.Request, res: express.Response) => {
  // TODO: Move to middleware
  // https://express-validator.github.io/docs/running-imperatively.html
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: validationErrors.array(),
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user }, accessTokenSecret, {
        expiresIn: '24h',
      });
      res.status(HTTP_CODES.OK).json({
        token,
      });
    } else {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({
        errors: [{
          message: 'Password is incorrect, please try again',
        }],
      });
    }
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: error.message,
    });
  }
};

export default {
  getAllUsers,
  login,
  validate,
};
