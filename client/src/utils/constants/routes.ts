export const HOME_ROUTE = "/home";
export const EVENTS_ROUTE = "/event";
export const SIGNUP_ROUTE = "/signup";
export const LOGIN_ROUTE = "/login";
export const PAST_EVENTS_ROUTE = "/event/past";
export const MY_PAST_EVENTS_ROUTE = "/event/my-past-events";
export const MY_UPCOMING_EVENTS_ROUTE = "/event/my-upcoming-events";
export const EVENT_PENDING_REQUESTS_ROUTE = "/event/pending-requests";
export const VOLUNTEER_PROFILES_ROUTE = "/volunteer";
export const VOLUNTEER_PENDING_REQUESTS_ROUTE = "/volunteer/pending-requests";
export const UNAUTHORIZED = "/unauthorized";

export const CREATE_EVENT_FORM_ROUTE = "/event/create";
export const EDIT_EVENT_FORM_ROUTE = (eventId: string) =>
  `/event/${eventId}/edit`;
export const EVENT_VOLUNTEERS_ROUTE = (eventId: string) =>
  `/event/${eventId}/volunteers`;
