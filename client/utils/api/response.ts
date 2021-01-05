import { CommitmentApplicationData } from '@type/commitmentApplication';
import { EventData } from '@type/event';
import { SignUpData } from '@type/signUp';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';

export type SignUpResponse = {
}

export type LoginResponse = {
  token: string
}

export type GetEventsResponse = {
  data: Array<EventData>
}

export type GetVolunteersResponse = {
  data: Array<VolunteerData>
}

export type GetVolunteersPaginatedResponse = GetVolunteersResponse & {
  count: number
  pageNo: number
  filters: {
    volunteerType: Record<VOLUNTEER_TYPE, boolean>
  }
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

// general response just to get a number
export type GetCountResponse = {
  count: number
}
