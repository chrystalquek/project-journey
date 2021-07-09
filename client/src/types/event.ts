import dayjs from "dayjs";
import { VolunteerType } from "@type/volunteer";

// Used when filtering actual events
export enum EventType {
  WORKSHOP = "workshop",
  VOLUNTEERING = "volunteering",
  HANGOUT = "hangout",
}

export type EventSearchType = "all" | "upcoming" | "past";

export type EventData = {
  _id: string;
  name: string;
  coverImage?: string;
  eventType: EventType;
  volunteerType: VolunteerType;
  startDate: string;
  endDate: string;
  deadline: string;
  description: string;
  facilitatorName?: string;
  facilitatorPhoto?: string;
  facilitatorDescription?: string;
  roles: Array<RoleData>;
  contentUrl?: string;
  location: string;
  isCancelled: boolean;
  feedbackStatus?: boolean; // by right shouldn't be here but for easy check whether current user has given feedback for past events
  createdAt: string;
};

export type RoleData = {
  name: string;
  description: string;
  capacity: number;
  volunteers: Array<string>;
};

// TODO remove below filtering stuff
// Used in filtering component
export enum EventFilters {
  DATE = "date",
  EVENTTYPE = "eventType",
  VOLUNTEERING = "volunteering",
  WORKSHOPS = "workshops",
  HANGOUTS = "hangouts",
  VOLUNTEERTYPE = "volunteerType",
  ADHOC = "adhoc",
  COMMITTED = "committed",
}

export type EventFilterOptions = {
  [EventFilters.DATE]: dayjs.Dayjs;
  [EventFilters.VOLUNTEERTYPE]: {
    [EventFilters.ADHOC]: boolean;
    [EventFilters.COMMITTED]: boolean;
  };
  [EventFilters.EVENTTYPE]: {
    [EventFilters.VOLUNTEERING]: boolean;
    [EventFilters.WORKSHOPS]: boolean;
    [EventFilters.HANGOUTS]: boolean;
  };
};
