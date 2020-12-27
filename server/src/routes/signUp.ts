import express from 'express';
import signUpController from '../controllers/signUp';
import { createProtectedRouter } from '../helpers/auth';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

// @route   POST /signup
// @desc    For volunteers to sign up for an event
// @access  Public
router.post(
  '/',
  validate(signUpController.getValidations('createSignUp')),
  signUpController.createSignUp,
);

// @route   GET /signup
// @desc    For volunteer and admin to read sign ups
// @access  Public
router.get(
  '/:id/:idType',
  signUpController.readSignUps,
);

// @route   GET /signup/pending
// @desc    For admin to read number of pending sign ups
// @access  Private

protectedRouter.get(
  '/pending',
  authorize(['admin']),
  signUpController.readPendingSignUps,
);

router.delete(
  '/:id/:idType',
  signUpController.deleteSignUp,
);

router.put(
  '/:id/:idType',
  validate(signUpController.getValidations('updateSignUp')),
  signUpController.updateSignUp,
);

export default router;
