import mongoose from 'mongoose';

import Event, { EventData } from '../models/Event';
import util from '../helpers/util';
import { EventSearchType } from '../models/event';
import { VolunteerType } from '../models/Volunteer';
import { Id } from '../types';

const createEvent = async (eventData: EventData): Promise<mongoose.Types.ObjectId> => {
  try {
    const eventSchemaData: mongoose.Document = new Event({
      name: eventData.name,
      coverImage: eventData.coverImage,
      eventType: eventData.eventType,
      volunteerType: eventData.volunteerType,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      deadline: eventData.deadline,
      vacancies: eventData.vacancies,
      description: eventData.description,
      facilitatorName: eventData.facilitatorName,
      facilitatorDescription: eventData.facilitatorDescription,
      facilitatorPhoto: eventData.facilitatorPhoto,
      roles: eventData.roles,
      contentUrl: eventData.contentUrl,
      contentType: eventData.contentType,
      location: eventData.location,
    });
    await eventSchemaData.save();
    return eventSchemaData._id;
  } catch (err) {
    throw new Error(err.msg);

  }
};

/**
 * Retrieves the event with the specified id.
 * @param id event id
 */
const readEvent = async (id: Id): Promise<EventData> => {
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
const readEventsByIds = async (ids: Id[], eventType: EventSearchType): Promise<EventData[]> => {
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
const readEvents = async (eventType: EventSearchType, volunteerType: VolunteerType[],
  skip?: number, limit?: number): Promise<EventData[]> => {
  try {
    let events: EventData[];

    const skipQuery = skip ?? 0;
    const limitQuery = limit ?? 0;

    switch (eventType) {
      case 'all':
        events = await Event.find({ volunteerType: { $in: volunteerType } })
          .skip(skipQuery).limit(limitQuery).lean()
          .exec();
        break;
      case 'past':
        events = await Event.find({
          startDate: { $lt: new Date() },
          volunteerType: { $in: volunteerType },
        })
          .skip(skipQuery).limit(limitQuery).lean()
          .exec();
        break;
      case 'upcoming':
        events = await Event.find({
          startDate: { $gt: new Date() },
          volunteerType: { $in: volunteerType },
        })
          .skip(skipQuery).limit(limitQuery).sort({ startDate: 1 })
          .lean()
          .exec();
        break;
      default: throw new Error('Event type is invalid');
    }

    return events;
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateEvent = async (
  id: Id,
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
  id: Id,
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

const deleteEvent = async (id: Id): Promise<void> => {
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
      throw new Error('Event is not found.');
    }

    return eventsNDaysAgo;
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
  findEventsNDaysAgo,
};
