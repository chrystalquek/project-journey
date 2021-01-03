import dayjs from 'dayjs';

export type EventData = {
  _id: string,
  name: string;
  coverImage?: string; // TODO: change to appropriate type
  eventType: string;
  volunteerType: string;
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
  name: string;
  description: string;
  capacity: number;
  volunteers: Array<string>;
}

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
  [EventFilters.EVENTTYPE]: {
    [EventFilters.VOLUNTEERING]: boolean,
    [EventFilters.WORKSHOPS]: boolean,
    [EventFilters.HANGOUTS]: boolean
  },
  [EventFilters.VOLUNTEERTYPE]: {
    [EventFilters.ADHOC]: boolean,
    [EventFilters.COMMITTED]: boolean
  }
}

// Used when filtering actual events
export enum Event {
  Volunteering = 'volunteering',
  Workshop = 'workshop',
  Hangout = 'hangout'
}
export type EventType = Event.Volunteering | Event.Workshop | Event.Hangout;

export enum Volunteer {
  Adhoc = 'ad-hoc',
  Committed = 'committed',
  Lead = 'lead',
  Admin = 'admin'
}
export type VolunteerType = Volunteer.Adhoc | Volunteer.Committed | Volunteer.Admin;
