import HTTP_CODES from "../constants/httpCodes";
import { EventData, EventSearchType } from "../models/Event";
import eventService from "../services/event";
import signUpService, { isSignUpAccepted } from "../services/signUp";
import {
  CancelEventRequest,
  CreateEventRequest,
  GetEventRequest,
  GetEventsRequest,
  GetSignedUpEventsRequest,
  UpdateEventRequest,
} from "../types/request/event";
import {
  CancelEventResponse,
  CreateEventResponse,
  GetEventResponse,
  GetEventsResponse,
  GetSignedUpEventsResponse,
  UpdateEventResponse,
} from "../types/response/event";

const createEvent = async (
  req: CreateEventRequest,
  res: CreateEventResponse
): Promise<void> => {
  try {
    const eventData = req.body;
    const event = await eventService.createEvent(eventData);
    res.status(HTTP_CODES.OK).send(event);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
    });
  }
};

const getEvent = async (
  req: GetEventRequest,
  res: GetEventResponse
): Promise<void> => {
  try {
    const event = await eventService.getEvent(req.params.id);
    res.status(HTTP_CODES.OK).json(event);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
    });
  }
};

/**
 * Retrieves either all, upcoming, or past events.
 */
const getEvents = async (
  req: GetEventsRequest,
  res: GetEventsResponse
): Promise<void> => {
  try {
    const { eventType } = req.params;
    const { pageNo, size } = req.query;

    let events: EventData[];
    if (!size || !pageNo) {
      events = await eventService.getEvents(eventType);
    } else {
      const pageNoNum = parseInt(pageNo, 10);
      const sizeNum = parseInt(size, 10);
      events = await eventService.getEvents(
        eventType,
        sizeNum * pageNoNum,
        sizeNum
      );
    }

    res.status(HTTP_CODES.OK).json({
      data: events,
    });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
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
const getSignedUpEvents = async (
  req: GetSignedUpEventsRequest,
  res: GetSignedUpEventsResponse
): Promise<void> => {
  try {
    const { userId, eventType } = req.params;
    const signUps = await signUpService.getSignUps(userId, "userId");

    /** For past events, filter sign ups with accepted status */
    /** status is an array if the sign up is accepted i.e. ["accepted", string] */
    const filteredSignUps =
      eventType === "past"
        ? signUps.filter((signUp) =>
            isSignUpAccepted(signUp.status, signUp.acceptedRole)
          )
        : signUps;

    const signedUpEventsIds: string[] = filteredSignUps.map(
      (signUp) => signUp.eventId
    );

    const signedUpEvents = await eventService.readEventsByIds(
      signedUpEventsIds,
      eventType as EventSearchType
    );

    // append feedback status
    if (eventType === "past") {
      const signedUpEventsWithFeedbackStatus: EventData[] = [];
      for (let i = 0; i < signedUpEvents.length; i += 1) {
        signedUpEventsWithFeedbackStatus.push({
          ...signedUpEvents[i],
          feedbackStatus: false, // TODO fix
        });
      }
      res
        .status(HTTP_CODES.OK)
        .json({ data: signedUpEventsWithFeedbackStatus });
      return;
    }

    res.status(HTTP_CODES.OK).json({ data: signedUpEvents });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
    });
  }
};

const updateEvent = async (
  req: UpdateEventRequest,
  res: UpdateEventResponse
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const event = await eventService.updateEvent(id, updatedFields);

    res.status(HTTP_CODES.OK).send(event);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
    });
  }
};

const cancelEvent = async (
  req: CancelEventRequest,
  res: CancelEventResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    await eventService.cancelEvent(id);

    // TODO: send emails to users that have previously signed up for the event.

    res.status(HTTP_CODES.OK).send("Event cancelled");
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
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
};
