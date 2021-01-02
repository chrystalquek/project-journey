<<<<<<< HEAD
import dayjs from 'dayjs';
import { StringDecoder } from 'string_decoder';

export type EventData = {
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
=======
import dayjs from 'dayjs';

export type EventData = {
  name: string;
  event_type: string;
  volunteer_type: string;
  description: string;
  content_url: string;
  content_type: string;
  facilitator_name: string;
  facilitator_description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  deadline: Date;
  additional_information: string;
  capacity: number;
  volunteers: Array<any>;
  roles: Array<{
    volunteers: Array<any>,
    name: string,
    description: string,
    capacity: number,
  }>
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
>>>>>>> 6128b0cf15002308b7280ca422451124312f0e98
