import dayjs from "dayjs";

export type EventData = {
  name: string;
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