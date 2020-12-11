import express from 'express';
import { body } from 'express-validator';
import { EventSearchType, EventData, SignUpData } from '../types';

import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';
import signUpService from '../services/signUp';

export type EventValidatorMethod = 'createEvent';

const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case 'createEvent': {
      return [
        body('name', 'name does not exist').exists(),
        body('description', 'description does not exist').exists(),
        body('contentUrl', 'content url is invalid').isURL(),
        body('facilitatorName', 'facilitator name does not exist').exists(),
        body('facilitatorDescription', 'facilitator description does not exist').exists(),
        body('startDate', 'start date does not exist').exists(),
        body('startDate', 'start date is after end date').custom((value, { req }) => value <= req.body.endDate),
        body('startDate', 'start date is of wrong date format').isISO8601(),
        body('endDate', 'end date does not exist').exists(),
        body('endDate', 'end date is of wrong date format').isISO8601(),
        body('deadline', 'deadline does not exist').exists(),
        body('deadline', 'deadline is of wrong date format').isISO8601(),
        body('volunteers', 'volunteers does not exist').exists(),
        body('volunteers', 'number of volunteers exceeds capacity').custom((value, { req }) => req.body.capacity == null || value.length <= req.body.capacity),
      ];
    }
    default: {
      return [];
    }
  }
};

const createEvent = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    await eventService.createEvent(req.body as EventData);
    res.status(HTTP_CODES.OK).send('Event data created');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const readEvent = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const event = await eventService.readEvent(req.params.id);

    // to access volunteers by Id
    // const volunteers = Volunteer.find(
    //   { _id: { $in: event.volunteers } },
    // );

    res.status(HTTP_CODES.OK).json(event);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateEvent = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body as EventData;

    await eventService.updateEvent(id, updatedFields);

    res.status(HTTP_CODES.OK).send('Event data updated');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteEvent = async (req: express.Request, res: express.Response) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(HTTP_CODES.OK).send('Event data deleted');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Retrieves all upcoming events.
 */
const readAllUpcomingEvents = async (req: express.Request, res: express.Response) => {
  const upcomingEvents = await eventService.readAllUpcomingEvents();
  res.json({
    upcomingEvents,
  });
};

/**
 * Retrieves all signed up upcoming events.
 * @param req.params.userId userId in SignUpData
 * @param req.params.eventType event type based on time period - all, upcoming, past
 */
const readSignedUpEvents = async (req: express.Request, res: express.Response) => {
  const { userId, eventType } = req.params;
  const signUps: SignUpData[] = await signUpService.readSignUps(userId, 'userId');
  const signedUpEventsIds: string[] = signUps.map((signUp) => signUp.eventId);

  const signedUpEvents = await eventService
    .readEvents(signedUpEventsIds, eventType as EventSearchType);

  res.json({ signedUpEvents });
};

export default {
  createEvent,
  readEvent,
  readAllUpcomingEvents,
  readSignedUpEvents,
  updateEvent,
  deleteEvent,
  getValidations,
};
