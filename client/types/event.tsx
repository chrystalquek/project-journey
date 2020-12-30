import dayjs from 'dayjs';

export type EventData = {
    name: string;
    coverImage?: string;
}

export type EventData = {
    name: string;
    coverImage?: string; // TODO: change to appropriate type
    volunteerType: string;
    startDateAndTime: Date;
    endDateAndTime: Date;
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
