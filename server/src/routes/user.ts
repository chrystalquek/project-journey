import express from 'express';
import userController from '../controllers/user';
import { createProtectedRouter } from '../helpers/auth';
import { validate } from '../helpers/validation';
import authorize from '../helpers/authorize';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

router.post(
  '/login',
  validate(userController.getValidations('login')),
  userController.login,
);
router.post(
  '/password',
  validate(userController.getValidations('updatePassword')),
  userController.updatePassword,
);

// Expanding this for other use-cases
protectedRouter.get('/', authorize(['admin']), userController.getAllUsers); // example usage of protectedRoute

export default router;
