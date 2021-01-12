import { EventPostData } from '@type/event';
import { SignUpData } from '@type/signUp';

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

export type QueryParams = {
  pageNo?: number
  size?: number
  [field: string]: any
}

export type CreateEventRequest = EventPostData;

export type EditEventRequest = {
  id: string,
  data: EventPostData
}

export type GetEventParams = string;

export type UpdateSignUpRequest = SignUpData;
