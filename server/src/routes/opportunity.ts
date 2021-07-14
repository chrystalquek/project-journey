import express from 'express';
import opportunityController from '../controllers/opportunity';
import authorize from '../helpers/authorize';
import { validate } from '../validations/global';
import getValidations from '../validations/opportunity';

const router = express.Router();

// @route   GET /opportunity/:id
// @desc    Get opportunity by id
router.get(
  '/:id',
  authorize([]),
  validate(getValidations('readOpportunity')),
  opportunityController.getOpportunity);

// @route   DELETE /opportunity/:id
// @desc    Delete a opportunity by id
router.delete(
  '/:id',
  authorize(['admin']),
  validate(getValidations('deleteOpportunity')),
  opportunityController.deleteOpportunity);

// @route   PUT /opportunity/:id
// @desc    Update a opportunity by id
router.put(
  '/:id',
  authorize(['admin']),
  validate(getValidations('updateOpportunity')),
  opportunityController.updateOpportunity);

// @route   POST /opportunity
// @desc    Post a new opportunity
router.post(
  '/',
  validate(getValidations('createOpportunity')),
  opportunityController.createOpportunity,
);

export default router;
