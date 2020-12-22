import mongoose from 'mongoose';
import { QueryParams, EventSearchType, EventData, EventSearchQuery } from '../types';

import Event from '../models/Event';

const createEvent = async (eventData: EventData): Promise<void> => {
  try {
    const eventSchemaData: mongoose.Document = new Event({
      _id: new mongoose.Types.ObjectId(),
      name: eventData.name,
      created_at: Date.now(),
      description: eventData.description,
      content_url: eventData.contentUrl,
      content_type: eventData.contentType,
      facilitator_name: eventData.facilitatorName,
      facilitator_description: eventData.facilitatorDescription,
      start_date: eventData.startDate,
      end_date: eventData.endDate,
      location: eventData.location,
      deadline: eventData.deadline,
      additional_information: eventData.additionalInformation,
      roles: eventData.roles,
    });
    await eventSchemaData.save();
  } catch (err) {
    throw new Error(err.msg);
  }
};

/**
 * Retrieves the event with the specified id.
 * @param id event id
 */
const readEvent = async (id: string): Promise<EventData> => {
  try {
    const event = await Event.findById(id);

    if (!event) {
      throw new Error('Event is not found.');
    }

    return event;
  } catch (err) {
    throw new Error(err.msg);
  }
};

/**
 * Retrieves either all, upcoming, or past events from the specified event ids.
 * A helper function for readSignedUpEvents
 * @param ids array of event ids
 * @param eventType event type - all, upcoming, or past
 * @return either all, upcoming, or past events
 */
const readEventsByIds = async (ids: string[], eventType: EventSearchType): Promise<EventData> => {
  try {
    let events;
    switch (eventType) {
      case 'all':
        events = await Event.find({
          _id: { $in: ids },
        });
        break;
      case 'upcoming':
        events = await Event.find({
          _id: { $in: ids },
          start_date: { $gt: new Date() },
        });
        break;
      case 'past':
        events = await Event.find({
          _id: { $in: ids },
          start_date: { $lt: new Date() },
        });
        break;
      default:
        throw new Error('Event type is invalid');
    }

    return events;
  } catch (err) {
    throw new Error(err.msg);
  }
};

/**
 * Retrieves either all, upcoming, or past events
 * Assists view_events (admin) - List of all upcoming events from DB
 * Assists view_past_events (admin) - List all past events from DB
 * @param eventType event type - all, upcoming, or past
 * @return either all, upcoming, or past events
 */
const readEvents = async (eventType: QueryParams): Promise<EventData[]> => {
  try {
    let events: EventData[];
    
    switch (eventType.searchType) {
    
      case 'all':
        events = await Event.find({}).skip(eventType.skip).limit(eventType.limit);
        break;
      case 'past':
        events = await Event.find({ start_date: { $lt: new Date() } }).skip(eventType.skip).limit(eventType.limit);
        break;
      case 'upcoming':
        events = await Event.find({ start_date: { $gt: new Date() } }).skip(eventType.skip).limit(eventType.limit);
        break;
      default: throw new Error('Event type is invalid');
    }
    return events;
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateEvent = async (
  id: string,
  updatedFields: EventData,
): Promise<void> => {
  try {
    await Event.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields }, // must map camelCase to snake-case, should we use https://github.com/bendrucker/snakecase-keys
      { new: true },
    );
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteEvent = async (id: string): Promise<void> => {
  try {
    const event = await Event.findById(id);

    if (!event) {
      throw new Error("Event can't be found");
    }

    await event.remove();
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createEvent,
  readEvent,
  readEvents,
  readEventsByIds,
  updateEvent,
  deleteEvent,
};
