import express from 'express';
import commitmentApplicationController from '../controllers/commitmentApplication';
import { createProtectedRouter } from '../helpers/auth';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

router.post('/', commitmentApplicationController.createCommitmentApplication);

router.get('/', commitmentApplicationController.readCommitmentApplications);

// @route   PUT /commitment-application
// @desc    Update a commitmentApplication by id
// @access  Private
protectedRouter.put('/:id', authorize(['admin']),
  validate(commitmentApplicationController.getValidations('updateCommitmentApplication')),
  commitmentApplicationController.updateCommitmentApplication);

export default router;
