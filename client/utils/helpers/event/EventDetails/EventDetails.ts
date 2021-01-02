import {EventData} from "@type/event";
import dayjs from "dayjs";
import {getEventVacancies} from "@utils/helpers/event/EventsPageBody";

export type TableData = {
  title: string,
  description: string,
  isHighlight: boolean,
}

export function createTblData(title: string, description: string, isHighlight: boolean): TableData {
  return { title, description, isHighlight }
}

// Extracts date, time, location, vacancies, singup deadline
export function getEventInfo(event: EventData) {
  const date = dayjs(event.start_date).format('ddd, DD MMMM YYYY');
  const startTime = dayjs(event.start_date).format('h.mma');
  const endTime = dayjs(event.end_date).format('h.mma');
  const { remaining, total } = getEventVacancies(event);
  const vacancies = `${remaining}/${total} ${remaining === 1 ? 'vacancy' : 'vacancies'} left`;
  const deadline = dayjs(event.deadline).format('DD MMMM YYYY hh:mmA');

  return [
    createTblData("Date:", date,false),
    createTblData("Time:", `${startTime} to ${endTime}`, false),
    createTblData("Location:", event.location, false),
    createTblData("Vacancies:", vacancies, false),
    createTblData("Sign-up deadline", deadline, true),
  ]
}