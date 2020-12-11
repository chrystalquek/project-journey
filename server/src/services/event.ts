import mongoose from 'mongoose';
import { EventData } from '../types';
import Event from '../models/Event';

const createEvent = async (eventData: EventData): Promise<void> => {
  try {
    const eventSchemaData = new Event({
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
      capacity: eventData.capacity,
      volunteers: eventData.volunteers,
    });
    await eventSchemaData.save();
  } catch (err) {
    throw new Error(err.msg);
  }
};

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

const readAllUpcomingEvents = async (): Promise<EventData[]> => {
  try {
    const upcomingEvents = await Event.find({'start_date': { $gte: new Date()}});

    return upcomingEvents;
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
  readAllUpcomingEvents,
  updateEvent,
  deleteEvent,
};
