import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";

export type SignupResponse = {

}

export type LoginResponse = {
  token: string
}

export type GetAllEventsResponse = {
  events: Array<EventData>
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
}