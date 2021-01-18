import express from 'express';
import { body } from 'express-validator';
import jwt from 'express-jwt';
import signUpService, { checkIfAccepted } from '../services/signUp';
import { roleCapacityValidator } from '../helpers/validation';
import {
  EventSearchType, EventData, RoleData, QueryParams,
} from '../types';
import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';

export type EventValidatorMethod = 'createEvent';

const getValidations = (method: EventValidatorMethod) => {
  switch (method) {
    case 'createEvent': {
      return [
        body('name', 'name does not exist').exists(),
        body('description', 'description does not exist').exists(),
        body('contentUrl', 'content url is invalid').optional({ checkFalsy: true }).isURL(),
        body('facilitatorName', 'facilitator name does not exist').optional({ checkFalsy: true }).isString(),
        body('facilitatorDescription', 'facilitator description is not a string').optional({ checkFalsy: true }).isString(),
        body('startDate', 'start date does not exist').exists(),
        body('startDate', 'start date is after end date').custom((value, { req }) => value <= req.body.endDate),
        body('startDate', 'start date is of wrong date format').isISO8601(),
        body('endDate', 'end date does not exist').exists(),
        body('endDate', 'end date is of wrong date format').isISO8601(),
        body('deadline', 'deadline does not exist').exists(),
        body('deadline', 'deadline is of wrong date format').isISO8601(),
        body('roles', 'roles is not an array').optional({ checkFalsy: true }).isArray(),
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
    req.body.isCancelled = false; // default
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
    const searchType = req.params.eventType as EventSearchType;
    const pageNo = Number(req.query.pageNo);
    const size = Number(req.query.size);
    const query: QueryParams = { searchType, skip: 0, limit: 0 };

    if (pageNo < 0) {
      throw new Error('Invalid page number, should start with 0');
    }
    query.skip = size * pageNo;
    query.limit = size;
    const events = await eventService.readEvents(query);
    res.status(HTTP_CODES.OK).json({
      data: events,
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

    const signedUpEventsIds: string[] = filteredSignUps.map((signUp) => signUp.eventId);

    const signedUpEvents = await eventService
      .readEventsByIds(signedUpEventsIds, eventType as EventSearchType);

    res.status(HTTP_CODES.OK).json({ data: signedUpEvents });
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

const cancelEvent = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    await eventService.cancelEvent(id);

    res.status(HTTP_CODES.OK).send('Event cancelled');
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
  cancelEvent,
  deleteEvent,
  getValidations,
};
