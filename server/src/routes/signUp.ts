import express from 'express';
import signUpController from '../controllers/signUp';
import { validate } from '../helpers/validation';

const router = express.Router();

// @route   POST /signup
// @desc    For volunteers to sign up for an event
// @access  Public
router.post(
  '/',
  validate(signUpController.getValidations('createSignUp')),
  signUpController.createSignUp,
);

// @route   POST /signup
// @desc    For volunteer and admin to read sign ups
// @access  Public
router.get(
  '/:id/:idType',
  signUpController.readSignUps,
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
