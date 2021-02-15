import mongoose from 'mongoose';
import { EventData } from '../types';

const { Schema } = mongoose;

export type EventModel = EventData & mongoose.Document;

const options = { discriminatorKey: 'eventType' };

const EventSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  coverImage: String,
  eventType: {
    type: String,
    enum: ['workshop', 'volunteering', 'hangout'],
  },
  volunteerType: {
    type: String,
    enum: ['ad-hoc', 'committed', 'lead', 'admin'],
  },
  startDate: Date,
  endDate: Date,
  deadline: Date,
  vacancies: Number,
  description: String,
  faciliatatorName: String,
  facilitatorDescription: String,
  facilitatorPhoto: String,
  roles: [{
    name: String, description: String, capacity: Number, volunteers: [mongoose.Types.ObjectId],
  }],
  contentUrl: String,
  contentType: {
    type: String,
    enum: ['pdf', 'video', 'image', 'links', 'document'],
  },
  location: String,
  isCancelled: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, options);

export default mongoose.model<EventModel>('Event', EventSchema);
