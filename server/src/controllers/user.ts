import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUser, readAllUsers } from '../services/user';
import { VolunteerData } from '../types';

import HTTP_CODES from '../constants/httpCodes';
import { accessTokenSecret } from '../helpers/auth';
import VALIDATOR from '../helpers/validation';
import { updateVolunteerDetails } from '../services/volunteer';

export type UserValidatorMethod = 'login' | 'updatePassword'

const getValidations = (method: UserValidatorMethod) => {
  switch (method) {
    case 'login': {
      return [
        VALIDATOR.email(false),
        VALIDATOR.password,
      ];
    }
    case 'updatePassword': {
      return [
        VALIDATOR.email(false),
        VALIDATOR.password,
        VALIDATOR.newPassword,
      ];
    }
    default:
      return [];
  }
};

const getAllUsers = async (req: express.Request, res: express.Response) => {
  const users = await readAllUsers();
  res.json({
    data: users,
  });
};

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    if (bcrypt.compareSync(password, user.password)) {
      const userCopy = Object.assign(user);
      delete userCopy.password;

      const userWithoutPassword: Omit<VolunteerData, 'password'> = userCopy;

      const token = jwt.sign(JSON.parse(JSON.stringify(userWithoutPassword)), accessTokenSecret, {
        expiresIn: '24h',
      });

      res.status(HTTP_CODES.OK).json({
        token,
      });
    } else {
      res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
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

const updatePassword = async (req: express.Request, res: express.Response) => {
  const {
    email,
    password,
    newPassword,
  } = req.body;

  try {
    const user = await getUser(email);
    if (bcrypt.compareSync(password, user.password)) {
      await updateVolunteerDetails(email, { password: newPassword });
      res.status(HTTP_CODES.OK).send();
    } else {
      res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
        errors: [{
          message: 'Password is incorrect, please try again',
        }],
      });
    }
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: [{
        message: error.message,
      }],
    });
  }
};

export default {
  getAllUsers,
  login,
  getValidations,
  updatePassword,
};
