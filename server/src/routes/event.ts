import express from 'express';
import eventController from '../controllers/event';
import { createProtectedRouter } from '../helpers/auth';
import { validate } from '../helpers/validation';
import authorize from '../helpers/authorize';

const router = express.Router();
const protectedRouter = createProtectedRouter(router);

// @route   GET /event/:id
// @desc    Get event by id
// @access  Private
protectedRouter.get('/:id', eventController.readEvent);

// @route   DELETE /event
// @desc    Delete a event by id
// @access  Private
protectedRouter.delete('/:id', authorize(['admin']), eventController.deleteEvent);

// @route   PUT /event
// @desc    Update a event by id
// @access  Private
protectedRouter.put('/:id', eventController.updateEvent);

// @route   POST /event
// @desc    Post a new event
// @access  Private
protectedRouter.post(
  '/',
  validate(eventController.getValidations('createEvent')),
  eventController.createEvent,
);

export default router;
