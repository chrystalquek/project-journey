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
