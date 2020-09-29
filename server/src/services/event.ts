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
      contentUrl: eventData.contentUrl,
      contentType: eventData.contentType,
      facilitatorName: eventData.facilitatorName,
      facilitatorDescription: eventData.facilitatorDescription,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      location: eventData.location,
      deadline: eventData.deadline,
      additionalInformation: eventData.additionalInformation,
      capacity: eventData.capacity,
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

const updateEvent = async (
  id: string,
  updatedFields: EventData,
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
  updateEvent,
  deleteEvent,
};
