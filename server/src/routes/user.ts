import express from 'express';
import userController from '../controllers/user';
import { validate } from '../helpers/validation';
import authorize from '../helpers/authorize';
import getValidations from '../validations/user';

const router = express.Router();

// @route   POST /user/login
// @desc    For volunteers and admins to login
router.post(
  '/login',
  validate(getValidations('login')),
  userController.login,
);

// @route   POST /user/password
// @desc    For volunteers and admins to change their password
router.post(
  '/password',
  validate(getValidations('updatePassword')),
  userController.updatePassword,
);

// Expanding this for other use-cases
protectedRouter.get('/',
  authorize(['admin']),
  userController.getAllUsers); // example usage of protectedRoute

export default router;
