import dayjs from 'dayjs';
import { MONTHS } from '@constants/dateMappings';
import { EventData } from '@type/event';

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
