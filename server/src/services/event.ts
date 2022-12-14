import Event, {
  EventData,
  EventSearchType,
  NewEventData,
} from "../models/Event";

const createEvent = async (eventData: NewEventData): Promise<EventData> => {
  try {
    const eventSchemaData = new Event(eventData);
    const event = await eventSchemaData.save();
    return event;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Retrieves the event with the specified id.
 * @param id event id
 */
const getEvent = async (id: string): Promise<EventData> => {
  try {
    const event = await Event.findById(id);

    if (!event) {
      throw new Error("Event is not found.");
    }

    return event;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Retrieves either all, upcoming, or past events from the specified event ids.
 * A helper function for getSignedUpEvents
 * @param ids array of event ids
 * @param eventType event type - all, upcoming, or past
 * @return either all, upcoming, or past events
 */
const readEventsByIds = async (
  ids: string[],
  eventType: EventSearchType
): Promise<EventData[]> => {
  try {
    let events;
    switch (eventType) {
      case "all":
        events = await Event.find({
          _id: { $in: ids },
        })
          .lean()
          .exec();
        break;
      case "upcoming":
        events = await Event.find({
          _id: { $in: ids },
          startDate: { $gt: new Date() },
        })
          .lean()
          .exec();
        break;
      case "past":
        events = await Event.find({
          _id: { $in: ids },
          startDate: { $lt: new Date() },
        })
          .lean()
          .exec();
        break;
      default:
        throw new Error("Event type is invalid");
    }

    return events.map((event: EventData) => event);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Retrieves either all, upcoming, or past events
 * Assists view_events (admin) - List of all upcoming events from DB
 * Assists view_past_events (admin) - List all past events from DB
 * @param eventType event type - all, upcoming, or past
 * @return either all, upcoming, or past events
 */
const getEvents = async (
  eventType: EventSearchType,
  skip?: number,
  limit?: number
): Promise<EventData[]> => {
  try {
    let events: EventData[];

    const skipQuery = skip ?? 0;
    const limitQuery = limit ?? 0;

    switch (eventType) {
      case "all":
        events = await Event.find({})
          .skip(skipQuery)
          .limit(limitQuery)
          .lean()
          .exec();
        break;
      case "past":
        events = await Event.find({
          startDate: { $lt: new Date() },
        })
          .skip(skipQuery)
          .limit(limitQuery)
          .lean()
          .exec();
        break;
      case "upcoming":
        events = await Event.find({
          startDate: { $gt: new Date() },
        })
          .skip(skipQuery)
          .limit(limitQuery)
          .sort({ startDate: 1 })
          .lean()
          .exec();
        break;
      default:
        throw new Error("Event type is invalid");
    }

    return events;
  } catch (err) {
    throw new Error(err);
  }
};

const updateEvent = async (
  id: string,
  updatedFields: Partial<EventData>
): Promise<EventData> => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    if (!event) {
      throw new Error("Event is not found.");
    }

    return event;
  } catch (err) {
    throw new Error(err);
  }
};

const cancelEvent = async (id: string): Promise<void> => {
  try {
    await Event.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err);
  }
};

export const findEventsNDaysAgo = async (n: number): Promise<EventData[]> => {
  try {
    const nDaysAgo = new Date();
    nDaysAgo.setDate(nDaysAgo.getDate() - n);

    const startOfNDaysAgo = new Date(nDaysAgo);
    startOfNDaysAgo.setHours(0, 0, 0);

    const endOfNDaysAgo = new Date(nDaysAgo);
    endOfNDaysAgo.setHours(23, 59, 59);

    const eventsNDaysAgo: EventData[] = await Event.find({
      endDate: {
        $gte: startOfNDaysAgo,
        $lt: endOfNDaysAgo,
      },
    });

    if (!eventsNDaysAgo || eventsNDaysAgo.length === 0) {
      throw new Error("Event is not found.");
    }

    return eventsNDaysAgo;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createEvent,
  getEvent,
  getEvents,
  readEventsByIds,
  updateEvent,
  cancelEvent,
  findEventsNDaysAgo,
};
