import express from 'express';
import eventController from '../controllers/event';
import opportunityController from '../controllers/opportunity';
import { createProtectedRouter } from '../helpers/auth';
import { validate } from '../helpers/validation';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

// @route   GET /opportunity/:id
// @desc    Get opportunity by id
// @access  Private
protectedRouter.get('/:id', opportunityController.readOpportunity);

// @route   DELETE /opportunity
// @desc    Delete a opportunity by id
// @access  Private
protectedRouter.delete('/:id', opportunityController.deleteOpportunity);

// @route   PUT /opportunity
// @desc    Update a opportunity by id
// @access  Private
protectedRouter.put('/:id', opportunityController.updateOpportunity);

// @route   POST /opportunity
// @desc    Post a new opportunity
// @access  Private
protectedRouter.post(
  '/',
  validate(eventController.getValidations('createEvent')),
  validate(opportunityController.getValidations('createOpportunity')),
  opportunityController.createOpportunity,
);

export default router;
