import dayjs from 'dayjs';
import { MONTHS } from '@constants/dateMappings';
import {
  Event, EventData, EventFilterOptions, EventFilters, EventType, Volunteer, VolunteerType,
} from '@type/event';

// Contains helper functions for everything related to the events page.

// Takes a start and end date, parses to human-readable form
export function parseDate(startDate: string, endDate: string) {
  if (startDate === null || endDate === null) {
    return { date: null, time: null };
  }
  const s = dayjs(startDate);
  const e = dayjs(endDate);
  const sMinutePadded = `${s.minute()}`.padStart(2, '0');
  const eMinutePadded = `${e.minute()}`.padStart(2, '0');
  const startTime = s.hour() > 13 ? `${s.hour() - 12}.${sMinutePadded}pm` : `${s.hour()}.${sMinutePadded}am`;
  const endTime = e.hour() > 13 ? `${e.hour() - 12}.${eMinutePadded}pm` : `${e.hour()}.${eMinutePadded}am`;
  // Same year, month, day -> format as <DD Month YYYY 1pm - 2pm>
  if (s.year() === e.year() && s.month() === e.month() && s.day() === e.day()) {
    return {
      date: `${e.date()} ${MONTHS[e.month()]} ${e.year()}`,
      time: `${startTime} - ${endTime}`,
    };
  }
  // For now, there are no multiple-date events
  return { date: null, time: null };
}

// Returns a tuple of (filled vacancies, total vacancies) for an event.
export function getVacancies(data: EventData) {
  if (!data || !data.roles) {
    return { filled: 0, total: 0 };
  }
  let total = 0; let
    filled = 0;
  data.roles.forEach((o) => {
    total += o.capacity ? o.capacity : 0;
    filled += o.volunteers ? o.volunteers.length : 0;
  });
  return { filled, total };
}

// Filters events based on event type and volunteer type given some filter options
export function withFilters(events: Array<EventData>, filters: EventFilterOptions) {
  return events.filter((e: EventData) => getDate(e) === getDateFilter(filters)
      && getEventFilters(filters).includes(getEventType(e))
      && getVolunteerFilters(filters).includes(getVolunteerType(e)));
}

// Getters for events, to future-proof changes to event structure
function getDate(e: EventData): dayjs.Dayjs {
  return dayjs(e.startDate);
}

function getEventType(e: EventData): EventType {
  return <Event.Volunteering | Event.Workshop | Event.Hangout>e.eventType; // type assertion
}

function getVolunteerType(e: EventData): VolunteerType {
  return <Volunteer.Adhoc | Volunteer.Committed | Volunteer.Admin>e.volunteerType;
}

// may be null
function getDateFilter(f: EventFilterOptions): dayjs.Dayjs {
  return f[EventFilters.DATE];
}

function getEventFilters(f: EventFilterOptions): Array<EventType> {
  const ret: Array<EventType> = [];
  const eFilters = f[EventFilters.EVENTTYPE];
  if (eFilters[EventFilters.VOLUNTEERING]) {
    ret.push(Event.Volunteering);
  }
  if (eFilters[EventFilters.WORKSHOPS]) {
    ret.push(Event.Workshop);
  }
  if (eFilters[EventFilters.HANGOUTS]) {
    ret.push(Event.Hangout);
  }
  return ret;
}

function getVolunteerFilters(f: EventFilterOptions): Array<VolunteerType> {
  const ret: Array<VolunteerType> = [];
  const vFilters = f[EventFilters.VOLUNTEERTYPE];
  if (vFilters[EventFilters.ADHOC]) {
    ret.push(Volunteer.Adhoc);
  }
  if (vFilters[EventFilters.COMMITTED]) {
    ret.push(Volunteer.Committed);
  }
  return ret;
}
