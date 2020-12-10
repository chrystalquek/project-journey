import express from 'express';
import userController from '../controllers/user';
import { createProtectedRouter } from '../helpers/auth';
import authorize from '../helpers/authorize';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

router.post(
  '/login',
  userController.validate('login'),
  userController.login,
);
router.post(
  '/password',
  userController.validate('updatePassword'),
  userController.updatePassword,
);

// Expanding this for other use-cases
protectedRouter.get('/', authorize(['admin']), userController.getAllUsers); // example usage of protectedRoute

export default router;
