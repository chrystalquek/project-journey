import { CommitmentApplicationStatus } from '@type/commitmentApplication';
import { EventPostData, EventSearchType } from '@type/event';
import { SignUpIdType } from '@type/signUp';

export type SignUpRequest = {
  name: string
  email: string
  password: string
  gender: string
  citizenship: string
  race: string
  hasVolunteered: boolean
  hasChildrenExperience: boolean
  hasExternalVolunteerExperience: boolean
  hasFirstAidCertification: boolean
  volunteerFrequency: number
  volunteerReason: string
  volunteerContribution: string
  birthday: Date
  volunteerType: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type SignUpQueryParams = {
  id: string,
  idType: SignUpIdType
}

export type VolunteerPaginatedQueryParams = {
  pageNo: number,
  size: number
  volunteerType: string,
  name?: string
}

export type EventQueryParams = {
  userId?: string
  eventType: EventSearchType
}

export type CommitmentApplicationQueryParams = {
  status: CommitmentApplicationStatus
}

export type CreateEventRequest = EventPostData;

export type EditEventRequest = {
  id: string,
  data: EventPostData
}

export type GetEventParams = string;
