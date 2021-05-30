import express from 'express';
import signUpService, { checkIfAccepted } from '../services/signUp';
import answerService from '../services/forms/answer';
import {
  EventSearchType, EventData, VolunteerType,
} from '../types';
import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';

const createEvent = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    req.body.isCancelled = false; // default
    const eventId = await eventService.createEvent(req.body as EventData);
    res.status(HTTP_CODES.OK).send({ eventId });
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

    if (event.volunteerType === 'committed' && req.user.volunteerType === 'ad-hoc') {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

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

    if (pageNo < 0 || size < 0) {
      throw new Error('Invalid page or size number');
    }

    const volunteerType: VolunteerType[] = req.user.volunteerType === 'ad-hoc'
      ? ['ad-hoc']
      : ['ad-hoc', 'committed'];

    let events;
    if (Number.isNaN(pageNo) || Number.isNaN(size)) {
      events = await eventService.readEvents(searchType, volunteerType);
    } else {
      events = await eventService.readEvents(searchType, volunteerType, size * pageNo, size);
    }
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

    // append feedback status
    if (eventType === 'past') {
      const signedUpEventsWithFeedbackStatus: EventData[] = [];
      const feedbackStatuses = await Promise.all(
        signedUpEvents.map(async (signedUpEvent) => answerService
          .getFeedbackStatus(userId, signedUpEvent._id)),
      );
      for (let i = 0; i < signedUpEvents.length; i += 1) {
        signedUpEventsWithFeedbackStatus.push({
          ...signedUpEvents[i],
          feedbackStatus: feedbackStatuses[i],
        });
      }
      res.status(HTTP_CODES.OK).json({ data: signedUpEventsWithFeedbackStatus });
      return;
    }

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
};
