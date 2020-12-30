import { EventData } from '@type/event';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';

export type LoginResponse = {
  token: string
}

export type GetAllEventsResponse = {
  events: Array<EventData>
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
  count: number
  pageNo: number
  filters: {
    volunteerType: Record<VOLUNTEER_TYPE, boolean>
  }
}
export type PostEventResponse = {}
