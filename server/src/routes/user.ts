import express from 'express';
import userController from '../controllers/user';
import { createProtectedRouter } from '../helpers/auth';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

router.post(
  '/login',
  userController.validate('login'),
  userController.login,
);

// Expanding this for other use-cases
protectedRouter.get('/', userController.getAllUsers); // example usage of protectedRoute

export default router;
