import mongoose from 'mongoose';
import { QueryParams, EventSearchType, EventData } from '../types';

import Event from '../models/Event';
import util from '../helpers/util';

const createEvent = async (eventData: EventData): Promise<void> => {
  try {
    const eventSchemaData: mongoose.Document = new Event({
      _id: new mongoose.Types.ObjectId(),
      name: eventData.name,
      cover_image: eventData.coverImage,
      eventType: eventData.eventType,
      volunteer_type: eventData.volunteerType,
      start_date: eventData.startDate,
      end_date: eventData.endDate,
      deadline: eventData.deadline,
      createdAt: Date.now(),
      vacancies: eventData.vacancies,
      description: eventData.description,
      facilitatorName: eventData.facilitatorName,
      facilitatorDescription: eventData.facilitatorDescription,
      facilitatorPhoto: eventData.facilitatorPhoto,
      roles: eventData.roles,
      contentUrl: eventData.contentUrl,
      contentType: eventData.contentType,
      location: eventData.location,
      isCancelled: eventData.isCancelled,
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
const readEventsByIds = async (ids: string[], eventType: EventSearchType): Promise<EventData[]> => {
  try {
    let events;
    switch (eventType) {
      case 'all':
        events = await Event.find({
          _id: { $in: ids },
        }).lean().exec();
        break;
      case 'upcoming':
        events = await Event.find({
          _id: { $in: ids },
          startDate: { $gt: new Date() },
        }).lean().exec();
        break;
      case 'past':
        events = await Event.find({
          _id: { $in: ids },
          startDate: { $lt: new Date() },
        }).lean().exec();
        break;
      default:
        throw new Error('Event type is invalid');
    }

    return events.map((event: EventData) => util.snakeToCamelCase(event));
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

    if (eventType.limit && eventType.skip) {
      switch (eventType.searchType) {
        case 'all':
          events = await Event.find({}).skip(eventType.skip).limit(eventType.limit).lean()
            .exec();
          break;
        case 'past':
          events = await Event.find({ start_date: { $lt: new Date() } }).skip(eventType.skip)
            .limit(eventType.limit).lean()
            .exec();
          break;
        case 'upcoming':
          events = await Event.find({ start_date: { $gt: new Date() } }).skip(eventType.skip)
            .limit(eventType.limit).sort({ startDate: 1 })
            .lean()
            .exec();
          break;
        default: throw new Error('Event type is invalid');
      }
    } else {
      switch (eventType.searchType) {
        case 'all':
          events = await Event.find({}).lean().exec();
          break;
        case 'past':
          events = await Event.find({ start_date: { $lt: new Date() } }).lean().exec();
          break;
        case 'upcoming':
          events = await Event.find({ start_date: { $gt: new Date() } })
            .sort({ startDate: 1 }).lean().exec();
          break;
        default: throw new Error('Event type is invalid');
      }
    }
    return events.map((event) => util.snakeToCamelCase(event) as EventData);
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateEvent = async (
  id: string,
  updatedFields: Partial<EventData>,
): Promise<void> => {
  try {
    await Event.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true },
    );
  } catch (err) {
    throw new Error(err.msg);
  }
};

const cancelEvent = async (
  id: string,
): Promise<void> => {
  try {
    await Event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isCancelled: true,
        },
      },
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
  cancelEvent,
  deleteEvent,
};
