import {EventData} from "@type/event";

export type LoginResponse = {
  token: string
}

export type GetAllEventsResponse = {
  events: Array<EventData>
}