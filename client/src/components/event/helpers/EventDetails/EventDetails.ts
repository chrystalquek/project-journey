import { EventData } from "@type/event";
import dayjs from "dayjs";
import { getEventVacancies } from "@components/event/helpers/EventsPageBody";
import { FormState } from "@components/event/EventDetails/EventRegisterForm";
import { CreateSignUpRequest } from "@api/request";

export type TableData = {
  title: string;
  description: string;
  isHighlight: boolean;
};

export enum FormDisabledReason {
  EVENT_FULL = "event_full",
  SIGNUP_PENDING = "signup_pending",
  SIGNUP_ACCEPTED = "signup_accepted",
}

export function createTblData(
  title: string,
  description: string,
  isHighlight: boolean
): TableData {
  return { title, description, isHighlight };
}

// Extracts date, time, location, vacancies, singup deadline
export function getEventInfo(event: EventData) {
  const dateTime = `${dayjs(event.startDate).format(
    "ddd, DD MMMM YYYY, h.mma"
  )} - ${dayjs(event.endDate).format("ddd, DD MMMM YYYY, h.mma")}`;
  const location = event.location ? event.location : "No location listed.";
  const { remaining, total } = getEventVacancies(event);
  const vacancies = `${remaining}/${total} ${
    remaining === 1 ? "vacancy" : "vacancies"
  } left`;
  const deadline = dayjs(event.deadline).format("DD MMMM YYYY hh:mm A");

  return [
    createTblData("Date and Time:", dateTime, false),
    createTblData("Location:", location, false),
    createTblData("Vacancies:", vacancies, false),
    createTblData("Sign-up deadline:", deadline, true),
  ];
}

// Extracts sign up data in a form suitable for API call
export function getFormData(
  uid: string,
  eid: string,
  form: FormState
): Omit<CreateSignUpRequest, "status"> {
  const preferences = [];
  if (form.firstChoice) {
    preferences.push(form.firstChoice);
  }
  if (form.secondChoice) {
    preferences.push(form.firstChoice);
  }
  if (form.thirdChoice) {
    preferences.push(form.firstChoice);
  }

  return {
    eventId: eid,
    userId: uid,
    preferences,
    isRestricted: true,
  };
}
