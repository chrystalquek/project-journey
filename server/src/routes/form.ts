import { Router } from 'express';
import { createProtectedRouter } from '../helpers/auth';
import { validate } from '../helpers/validation';
import formController from '../controllers/form';

const router = Router();
const protectedRouter = createProtectedRouter(router);

router.post('/', validate(formController.getValidations('createForm')), formController.createForm);

export default router;
