import { VolunteerSortFieldsType } from '@components/volunteer/VolunteerProfile';
import { CommitmentApplicationData } from '@type/commitmentApplication';
import { EventData } from '@type/event';
import { SignUpData } from '@type/signUp';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';

export type SignUpResponse = Record<string, any> & void // Not sure what type?

export type LoginResponse = {
  token: string
}

export type GetAllEventsResponse = {
  data: Array<EventData>
}

export type GetEventsResponse = {
  data: Array<EventData>
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
}

export type GetVolunteersPaginatedResponse = GetVolunteersResponse & {
  count: number
}

export type GetCommitmentApplicationResponse = {
  data: Array<CommitmentApplicationData>
}

export type EditEventResponse = {}

export type GetEventResponse = EventData;
export type GetSignUpsResponse = {
  data: Array<SignUpData>
}

export type CreateEventResponse = {}

export type UploadImageResponse = {
  name: string,
  url: string
}
// general response just to get a number
export type GetCountResponse = {
  count: number
}

export type CreateSignUpResponse = {
  signUpId: string
}

export type UpdateSignUpResponse = {
  success: boolean,
}

export type CreateUpdateSignUpResponse = {
  success: boolean,
}
