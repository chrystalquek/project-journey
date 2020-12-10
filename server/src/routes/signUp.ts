import express from 'express';
import signUpController from '../controllers/signUp';

const router = express.Router();

router.post(
  '/',
  signUpController.validate('createSignUp'),
  signUpController.createSignUp,
);

router.get(
  '/:id/:idType',
  signUpController.readSignUp,
);

router.delete(
  '/:id/:idType',
  signUpController.deleteSignUp,
);

router.put(
  '/:id/:idType',
  signUpController.updateSignUp,
);

export default router;
