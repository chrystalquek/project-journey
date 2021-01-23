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
protectedRouter.get('/single/:id', eventController.readEvent);

// @route   GET /event/:eventType
// @desc    Get either all, upcoming, or past events
// @access  Private
protectedRouter.get('/multiple/:eventType', eventController.readEvents);

// @route   GET /signup/:userId/:eventType
// @desc    Get either all, upcoming, or past signed up events
// @access  Private
protectedRouter.get('/signup/:userId/:eventType', eventController.readSignedUpEvents);

// @route   DELETE /event
// @desc    Delete a event by id
// @access  Private
protectedRouter.delete('/:id', authorize(['admin']), eventController.deleteEvent);

// @route   PUT /event
// @desc    Update a event by id
// @access  Private
protectedRouter.put('/:id', authorize(['admin']), eventController.updateEvent);

// @route   PUT /event/cancel/:id
// @desc    Cancel an event by id
// @access  Private
protectedRouter.put('/cancel/:id', authorize(['admin']), eventController.cancelEvent);

// @route   POST /event
// @desc    Post a new event
// @access  Private
router.post(
  '/',
  validate(eventController.getValidations('createEvent')),
  eventController.createEvent,
);

export default router;
