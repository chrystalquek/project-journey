import express from 'express';
import {
  createCommitmentApplication,
  readCommitmentApplications,
  updateCommitmentApplication,
} from '../controllers/commitmentApplication';
import { getValidations } from '../validations/commitmentApplication';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();

router.post(
  '/',
  validate(getValidations('createCommitmentApplication')),
  createCommitmentApplication,
);

router.get('/', readCommitmentApplications);

// @route   PUT /commitment-application
// @desc    Update a commitmentApplication by id
// @access  Private
router.put(
  '/:id',
  authorize(['admin']),
  validate(getValidations('updateCommitmentApplication')),
  updateCommitmentApplication,
);

export default router;
