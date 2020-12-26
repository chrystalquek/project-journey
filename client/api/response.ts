import { VolunteerData } from 'types/volunteer';

export type SignupResponse = {

}

export type LoginResponse = {
  token: string
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
}
