import mongoose from 'mongoose'
import { Type, createSchema, ExtractProps } from 'ts-mongoose';
import { VOLUNTEER_TYPE } from './Volunteer';

const options = { discriminatorKey: 'eventType' };

export const EVENT_TYPE = ['workshop', 'volunteering', 'hangout'] as const;
export type EventType = (typeof EVENT_TYPE)[number]

// make sure RoleData matches fields defined in EventSchema
export type RoleData = {
  name: string;
  description: string;
  capacity: number;
  volunteers: string[];
}

export const CONTENT_TYPE = ['pdf', 'video', 'image', 'links', 'document'];

export const EVENT_SEARCH_TYPE = ['all' , 'upcoming' , 'past'] as const;
export type EventSearchType = (typeof EVENT_SEARCH_TYPE)[number]

const EventSchema = createSchema(
  {
    name: Type.string({ required: true }),
    coverImage: Type.string({ required: false }),
    eventType: Type.string({
      enum: EVENT_TYPE,
      required: true
    }),
    volunteerType: Type.string({
      enum: VOLUNTEER_TYPE,
      required: true
    }),
    startDate: Type.date({ required: true }),
    endDate: Type.date({ required: true }),
    deadline: Type.date({ required: true }),
    vacancies: Type.number({ required: true }),
    description: Type.string({ required: true }),
    facilitatorName: Type.string({ required: false }),
    facilitatorDescription: Type.string({ required: false }),
    facilitatorPhoto: Type.string({ required: false }),
    roles: Type.array({ required: true }).of({
      name: Type.string({ required: true }),
      description: Type.string({ required: true }),
      capacity: Type.number({ required: true }),
      volunteers: Type.array({ required: true }).of(Type.objectId()),
    }),
    contentUrl: Type.string({ required: false }),
    contentType: Type.string({
      enum: CONTENT_TYPE,
      required: false
    }),
    location: Type.string({ required: true }),
    isCancelled: Type.boolean({
      required: true,
      default: false,
    }),
    feedbackStatus: Type.boolean({
      required: false
    }),
    createdAt: Type.date({
      required: true,
      default: Date.now,
    }),
  }, 
  options
)

export type EventData = Omit<ExtractProps<typeof EventSchema>, "__v" | "_id" | "roles"> & {
  _id: string,
  roles: RoleData[]
};

export type NewEventData = Omit<EventData, "_id" | "createdAt">

type EventModel = EventData & mongoose.Document
export default mongoose.model<EventModel>('Event', EventSchema);
