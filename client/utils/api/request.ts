import { EventData } from '@type/event';

export type SignupRequest = {
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

export type QueryParams = {
  pageNo?: number
  size?: number
  [field: string]: any
}

export type CreateEventRequest = EventData;

export type EditEventRequest = {
  id: string,
  data: EventData
}

export type GetEventParams = string;
