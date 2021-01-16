import dayjs from 'dayjs';
import { VOLUNTEER_TYPE } from '@type/volunteer';

export type EventPostData = {
  name: string;
  coverImage?: string; // TODO: change to appropriate type
  eventType: string;
  volunteerType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  vacancies: number;
  description: string;
  facilitatorName?: string;
  facilitatorPhoto?: string;
  facilitatorDescription?: string;
  roles?: Array<RoleData>;
  contentUrl?: string;
  contentType?: string;
  location: string;
}

export type EventData = {
  _id: string,
  name: string;
  eventType: EventType;
  createdAt: Date;
  coverImage?: string; // TODO: change to appropriate type
  volunteerType: VOLUNTEER_TYPE;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  vacancies: number;
  description: string;
  facilitatorName?: string;
  facilitatorPhoto?: string;
  facilitatorDescription?: string;
  roles?: Array<RoleData>;
  contentUrl?: string;
  contentType?: string;
  location: string;
}

export interface RoleData {
  _id: string,
  volunteers: Array<string>,
  name: string;
  description: string;
  capacity: number;
}

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

// Used when filtering actual events
export enum Event {
  Volunteering = 'volunteering',
  Workshop = 'workshop',
  Hangout = 'hangout'
}

export type EventType = Event.Volunteering | Event.Workshop | Event.Hangout;

export type EventSearchType = 'all' | 'upcoming' | 'past'
