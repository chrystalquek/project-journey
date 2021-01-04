import mongoose from 'mongoose';
import { EventData } from '../types';

const { Schema } = mongoose;

export type EventModel = EventData & mongoose.Document;

const options = { discriminatorKey: 'eventType' };

const EventSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  event_type: {
    type: String,
    enum: ['workshop', 'volunteering', 'hangout'],
  },
  volunteer_type: {
    type: String,
    enum: ['ad-hoc', 'committed', 'lead', 'admin'],
  },
  start_date: Date,
  end_date: Date,
  deadline: Date,
  vacancies: Number,
  description: String,
  facilitator_name: String,
  facilitator_description: String,
  roles: [{
    name: String, description: String, capacity: Number, volunteers: [mongoose.Types.ObjectId],
  }],
  content_url: String,
  content_type: {
    type: String,
    enum: ['pdf', 'video', 'image', 'links', 'document'],
  },
  location: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
}, options);

export default mongoose.model<EventModel>('Event', EventSchema);
