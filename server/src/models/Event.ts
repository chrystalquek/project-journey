import mongoose from 'mongoose';
import { EventData } from '../types';

const { Schema } = mongoose;

export type EventModel = EventData & mongoose.Document;
export type RoleDataSchema = [{
  name: String, description: String, capacity: Number, volunteers: [mongoose.Types.ObjectId],
}];

const options = { discriminatorKey: 'eventType' };

const EventSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  description: String,
  content_url: String,
  content_type: {
    type: String,
    enum: ['pdf', 'video', 'image', 'links', 'document'],
  },
  facilitator_name: String,
  facilitator_description: String,
  start_date: Date,
  end_date: Date,
  location: String,
  deadline: Date,
  additional_information: String,
  roles: RoleDataSchema,
  created_at: {
    type: Date,
    default: Date.now,
  },
}, options);

export default mongoose.model<EventModel>('Event', EventSchema);
