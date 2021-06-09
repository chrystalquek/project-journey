import signUpService, { checkIfAccepted } from '../services/signUp';
import answerService from '../services/forms/answer';
import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';
import { EventData, EventSearchType } from '../models/Event';
import { VolunteerType } from '../models/Volunteer';
import { CancelEventRequest, CreateEventRequest, DeleteEventRequest, GetEventRequest, GetEventsRequest, GetSignedUpEventsRequest, UpdateEventRequest } from '../types/request/event';
import { CancelEventResponse, CreateEventResponse, DeleteEventResponse, GetEventResponse, GetEventsResponse, GetSignedUpEventsResponse, UpdateEventResponse } from '../types/response/event';

const createEvent = async (req: CreateEventRequest, res: CreateEventResponse): Promise<void> => {
  try {
    // TODO Array<QuestionsOptionsRequestData> also sent along to create form
    const eventData = req.body;
    const event = await eventService.createEvent(eventData);
    res.status(HTTP_CODES.OK).send(event);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getEvent = async (req: GetEventRequest, res: GetEventResponse): Promise<void> => {
  try {
    const event = await eventService.getEvent(req.params.id);

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
const getEvents = async (req: GetEventsRequest, res: GetEventsResponse): Promise<void> => {
  try {
    const { eventType } = req.params
    const { pageNo, size } = req.query

    const volunteerType: VolunteerType[] = req.user.volunteerType === 'ad-hoc'
      ? ['ad-hoc']
      : ['ad-hoc', 'committed'];

    let events: EventData[];
    if (!size || !pageNo) {
      events = await eventService.getEvents(eventType, volunteerType);
    } else {
      const pageNoNum = parseInt(pageNo)
      const sizeNum = parseInt(size)
      events = await eventService.getEvents(eventType, volunteerType, sizeNum * pageNoNum, sizeNum);
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
const getSignedUpEvents = async (req: GetSignedUpEventsRequest, res: GetSignedUpEventsResponse): Promise<void> => {
  try {
    const { userId, eventType } = req.params;
    const signUps = await signUpService.getSignUps(userId, 'userId');

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

const updateEvent = async (req: UpdateEventRequest, res: UpdateEventResponse): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const event = await eventService.updateEvent(id, updatedFields);

    res.status(HTTP_CODES.OK).send(event);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const cancelEvent = async (req: CancelEventRequest, res: CancelEventResponse): Promise<void> => {
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

const deleteEvent = async (req: DeleteEventRequest, res: DeleteEventResponse): Promise<void> => {
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
  getEvent,
  getEvents,
  getSignedUpEvents,
  updateEvent,
  cancelEvent,
  deleteEvent,
};
