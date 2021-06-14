export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Date obj -> 12:00pm
export function formatAMPM(date: Date) {
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes}${ampm}`;
  return strTime;
}

// (date, date) -> { 29 October 2020, 2.30pm - 6.00pm } ie { date, time }
export function formatDateStartEndTime(startDate: Date, endDate: Date) {
  if (startDate === null || endDate === null) {
    return { date: null, time: null };
  }

  // assume single day events
  if (!(startDate.getFullYear() === endDate.getFullYear()
  && startDate.getMonth() === endDate.getMonth() && startDate.getDate() === endDate.getDate())) {
    return { date: null, time: null };
  }

  const date = `${startDate.getDate()} ${MONTHS[startDate.getMonth()]} ${startDate.getFullYear()}`;
  const time = `${formatAMPM(startDate)} - ${formatAMPM(endDate)}`;
  return { date, time };
}

// to 26/08/2018
export function formatDDMMYYYY(date: string): string {
  return new Date(date).toLocaleDateString();
}
