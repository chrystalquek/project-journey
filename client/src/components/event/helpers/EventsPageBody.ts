import dayjs from 'dayjs';
import { MONTHS } from '@utils/helpers/date';
import {
  EventData, EventFilterOptions, EventFilters, EventType,
} from '@type/event';
import { VolunteerType } from '@type/volunteer';

// Contains helper functions for everything related to the events page.

// Takes a start and end date, parses to human-readable form
export function parseDate(startDate: Date, endDate: Date) {
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

// Returns an object of (filled vacancies, total vacancies) for an event.
export function getEventVacancies(data: EventData): { filled: number, total: number, remaining: number } {
  if (!data || !data.roles) {
    return { filled: 0, total: 0, remaining: 0 };
  }
  let total = 0;
  let filled = 0;
  data.roles.forEach((o) => {
    total += o.capacity ? o.capacity : 0;
    filled += o.volunteers ? o.volunteers.length : 0;
  });
  return { filled, total, remaining: total - filled };
}

// Getters for events, to future-proof changes to event structure
function getDate(e: EventData): dayjs.Dayjs {
  return dayjs(e.startDate);
}

function getEventType(e: EventData): EventType {
  return e.eventType as EventType; // type assertion
}

function getVolunteerType(e: EventData): VolunteerType {
  return e.volunteerType as VolunteerType;
}

// may be null
function getDateFilter(f: EventFilterOptions): dayjs.Dayjs {
  return f[EventFilters.DATE];
}

function getEventFilters(f: EventFilterOptions): Array<EventType> {
  const ret: Array<EventType> = [];
  const eFilters = f[EventFilters.EVENTTYPE];
  if (eFilters[EventFilters.VOLUNTEERING]) {
    ret.push(EventType.VOLUNTEERING);
  }
  if (eFilters[EventFilters.WORKSHOPS]) {
    ret.push(EventType.WORKSHOP);
  }
  if (eFilters[EventFilters.HANGOUTS]) {
    ret.push(EventType.HANGOUT);
  }
  return ret;
}

function getVolunteerFilters(f: EventFilterOptions): Array<VolunteerType> {
  const ret: Array<VolunteerType> = [];
  const vFilters = f[EventFilters.VOLUNTEERTYPE];
  if (vFilters[EventFilters.ADHOC]) {
    ret.push(VolunteerType.ADHOC);
  }
  if (vFilters[EventFilters.COMMITTED]) {
    ret.push(VolunteerType.COMMITTED);
  }
  return ret;
}

/**
 * Compares two dayjs.Dayjs objects based on the date but not time
 *
 * @param d1 arbitrary date to be compared
 * @param d2 arbitrary date to be compared
 */
function areDatesEqual(d1: dayjs.Dayjs, d2: dayjs.Dayjs) {
  return d1.diff(d2, 'day') === 0;
}

// Filters events based on event type and volunteer type given some filter options
export function withFilters(events: Array<EventData>, filters: EventFilterOptions) {
  // TODO: sort by increasing remaining slots left
  // default calendar value is null
  const allowAllDates = getDateFilter(filters) === null;

  return events.filter((e: EventData) => {
    const allowEvent = getEventType(e) === undefined;
    const allowVol = getVolunteerType(e) === undefined;

    return (allowAllDates ? true : areDatesEqual(getDateFilter(filters), getDate(e)))
      && (allowEvent || getEventFilters(filters).includes(getEventType(e)))
      && (allowVol || getVolunteerFilters(filters).includes(getVolunteerType(e)));
  });
}
