import { EventData } from "types/event"
import { SignUpData } from "types/signUp"
import { VolunteerData, VOLUNTEER_TYPE } from "types/volunteer"

export type SignupResponse = {

}

export type LoginResponse = {
  token: string
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
  count: number
  pageNo: number
  filters: {
    volunteerType: Record<VOLUNTEER_TYPE, boolean>
  }
}

export type GetSignUpsResponse = {
  data: Array<SignUpData>
}

export type GetEventsResponse = {
  data: Array<EventData>
}

export type GetCountResponse = {
  count: number
}
