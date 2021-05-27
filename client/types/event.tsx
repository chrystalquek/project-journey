import dayjs from 'dayjs';
import { VolunteerType } from '@type/volunteer';

// Used when filtering actual events
export enum EventType {
  WORKSHOP = 'workshop',
  VOLUNTEERING = 'volunteering',
  HANGOUT = 'hangout'
}

export enum ContentType {
  PDF = 'pdf',
  VIDEO = 'video',
  IMAGE = 'image',
  LINKS = 'links',
  DOCUMENT = 'document'
}

export type EventSearchType = 'all' | 'upcoming' | 'past'

export type EventData = {
  _id: string,
  name: string;
  coverImage?: string; // TODO: change to appropriate type
  eventType: EventType;
  volunteerType: VolunteerType;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  vacancies: number;
  description: string;
  facilitatorName?: string;
  facilitatorPhoto?: string;
  facilitatorDescription?: string;
  roles: Array<RoleData>;
  contentUrl?: string;
  contentType?: ContentType;
  location: string;
  isCancelled: boolean
  feedbackStatus?: boolean; // for past events
  createdAt: Date;
}

export type RoleData = {
  name: string;
  description: string;
  capacity: number;
  volunteers: Array<string>,
}

// TODO remove below filtering stuff
// Used in filtering component
export enum EventFilters {
  DATE = 'date',
  EVENTTYPE = 'eventType',
  VOLUNTEERING = 'volunteering',
  WORKSHOPS = 'workshops',
  HANGOUTS = 'hangouts',
  VOLUNTEERTYPE = 'volunteerType',
  ADHOC = 'adhoc',
  COMMITTED = 'committed'
}

export type EventFilterOptions = {
  [EventFilters.DATE]: dayjs.Dayjs,
  [EventFilters.VOLUNTEERTYPE]: {
    [EventFilters.ADHOC]: boolean,
    [EventFilters.COMMITTED]: boolean
  }
  [EventFilters.EVENTTYPE]: {
    [EventFilters.VOLUNTEERING]: boolean,
    [EventFilters.WORKSHOPS]: boolean,
    [EventFilters.HANGOUTS]: boolean
  },
}
