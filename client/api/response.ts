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
