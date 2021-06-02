import express from 'express';
import commitmentApplicationController from '../controllers/commitmentApplication';
import getValidations from '../validations/commitmentApplication';
import authorize from '../helpers/authorize';
import { validate } from '../validations/global';

const router = express.Router();

router.post(
  '/',
  validate(getValidations('createCommitmentApplication')),
  commitmentApplicationController.createCommitmentApplication,
);

router.get('/',
  commitmentApplicationController.getCommitmentApplications);

// @route   PUT /commitment-application
// @desc    Update a commitmentApplication by id
// @access  Private
router.put(
  '/:id',
  authorize(['admin']),
  validate(getValidations('updateCommitmentApplication')),
  commitmentApplicationController.updateCommitmentApplication,
);

export default router;
