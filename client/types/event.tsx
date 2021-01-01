import dayjs from 'dayjs';
import {VOLUNTEER_TYPE} from "@type/volunteer";

export type EventData = {
  _id: string;
  name: string;
  event_type: EventType;
  volunteer_type: VOLUNTEER_TYPE;
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
  volunteers: Array<string>;
  roles: Array<{
    volunteers: Array<string>,
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

