import express from 'express';
import { body } from 'express-validator';
import signUpService, { checkIfAccepted } from '../services/signUp';
import { roleCapacityValidator } from '../helpers/validation';
import { EventSearchType, EventData, RoleData } from '../types';

import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';

export type EventValidatorMethod = 'createEvent';

const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case 'createEvent': {
      return [
        body('name', 'name does not exist').exists(),
        body('description', 'description does not exist').exists(),
        body('contentUrl', 'content url is invalid').custom((value) => value === null || value.isURL()),
        body('facilitatorName', 'facilitator name does not exist').optional({ nullable: true }).isString(),
        body('facilitatorDescription', 'facilitator description is not a string').optional({ nullable: true }).isString(),
        body('startDateAndTime', 'start date does not exist').exists(),
        body('startDateAndTime', 'start date is after end date').custom((value, { req }) => value <= req.body.endDateAndTime),
        body('startDateAndTime', 'start date is of wrong date format').isISO8601(),
        body('endDateAndTime', 'end date does not exist').exists(),
        body('endDateAndTime', 'end date is of wrong date format').isISO8601(),
        body('deadline', 'deadline does not exist').exists(),
        body('deadline', 'deadline is of wrong date format').isISO8601(),
        body('roles', 'roles is not an array').optional({ nullable: true }).isArray(),
        body('roles', 'number of volunteers exceeds role capacity').custom((roles: RoleData[]) => roleCapacityValidator(roles)),
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

/**
 * Retrieves either all, upcoming, or past events.
 */
const readEvents = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const events = await eventService.readEvents(req.params.eventType as EventSearchType);

    res.status(HTTP_CODES.OK).json({
      events,
    });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Retrieves eitherall, upcoming, or past signed up events.
 * Assists view_upcoming_events (volunteer) - List of all upcoming events signed up by volunteer
 * Assists view_my_past_events (volunteer) - List of all past events done by volunteer
 * @param req.params.userId userId in SignUpData
 * @param req.params.eventType event type based on time period - all, upcoming, past
 */
const readSignedUpEvents = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, eventType } = req.params;
    const signUps = await signUpService.readSignUps(userId, 'userId');

    /** For past events, filter sign ups with accepted status */
    /** status is an array if the sign up is accepted i.e. ["accepted", string] */
    const filteredSignUps = eventType === 'past'
      ? signUps.filter((signUp) => checkIfAccepted(signUp.status))
      : signUps;

    const signedUpEventsIds: string[] = filteredSignUps.map((signUp) => signUp.event_id);

    const signedUpEvents = await eventService
      .readEventsByIds(signedUpEventsIds, eventType as EventSearchType);

    res.status(HTTP_CODES.OK).json({ signedUpEvents });
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

export default {
  createEvent,
  readEvent,
  readEvents,
  readSignedUpEvents,
  updateEvent,
  deleteEvent,
  getValidations,
};
