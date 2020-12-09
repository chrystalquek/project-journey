import express from 'express';
import eventController from '../controllers/event';
import { createProtectedRouter } from '../helpers/auth';
import authorize from '../helpers/authorize';
import { VolunteerRole } from '../types';

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
  eventController.validate('createEvent'),
  eventController.createEvent,
);

export default router;
