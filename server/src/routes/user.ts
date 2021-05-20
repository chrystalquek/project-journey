import express from 'express';
import userController from '../controllers/user';
import { validate } from '../helpers/validation';
import authorize from '../helpers/authorize';

const router = express.Router();

// @route   POST /user/login
// @desc    For volunteers and admins to login
router.post(
  '/login',
  validate(userController.getValidations('login')),
  userController.login,
);

// @route   POST /user/password
// @desc    For volunteers and admins to change their password
router.post(
  '/password',
  authorize([]),
  validate(userController.getValidations('updatePassword')),
  userController.updatePassword,
);

export default router;
