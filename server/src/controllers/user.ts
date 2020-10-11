import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUserExists, readAllUsers } from '../services/user';

import HTTP_CODES from '../constants/httpCodes';
import { accessTokenSecret } from '../helpers/auth';

const getAllUsers = async (req: express.Request, res: express.Response) => {
  const users = await readAllUsers();
  res.json({
    users,
  });
};

const login = async (req: express.Request, res: express.Response) => {
  // Read username and password from request body
  const { fullName, password } = req.body;

  const user = await checkUserExists(fullName);

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user }, accessTokenSecret, {
        expiresIn: '24h',
      });

      res.json({
        token,
      });
    } else {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({
        errors: [{ msg: 'Unauthenticated' }],
      });
    }
  } else {
    res.send('Username or password incorrect');
  }
};

export default {
  getAllUsers,
  login,
};
