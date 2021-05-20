import express from 'express';
import commitmentApplicationController from '../controllers/commitmentApplication';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();

// @route   POST /commitment-application
// @desc    For ad-hoc volunteers to submit a commitment application
router.post('/', authorize(['ad-hoc']), commitmentApplicationController.createCommitmentApplication);

// @route   GET /commitment-application
// @desc    For admin to read commitment applications
router.get('/', authorize(['admin']), commitmentApplicationController.readCommitmentApplications);

// @route   PUT /commitment-application/:id
// @desc    For admin to approve or reject a commitment application
router.put('/:id', authorize(['admin']),
  validate(commitmentApplicationController.getValidations('updateCommitmentApplication')),
  commitmentApplicationController.updateCommitmentApplication);

export default router;
