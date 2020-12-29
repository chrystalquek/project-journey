import { VolunteerData } from 'types/volunteer';

export type LoginResponse = {
  token: string
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
}

export type PostEventResponse = {}
