import { EventData } from '@type/event';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';

export type SignupResponse = {

}

export type LoginResponse = {
  token: string
}

export type GetAllEventsResponse = {
  data: Array<EventData>
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
  count: number
  pageNo: number
  filters: {
    volunteerType: Record<VOLUNTEER_TYPE, boolean>
  }
}
