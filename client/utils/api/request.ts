import { EventPostData } from '@type/event';
import { VolunteerData } from '@type/volunteer';
import { SignUpData, SignUpIdType, SignUpStatus } from '@type/signUp';

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

export type UploadImageRequest = FormData;

export type UploadImageRequestWithField = {
  name: string,
  form: FormData,
}
export type CreateCommitmentApplicationRequest = {
  volunteerId: string
}

export type UpdateVolunteerRequest = {
  email: string,
  updatedVolunteerData: Partial<VolunteerData>
}
// SIGN-UPS
export type SignUpQueryParams = {
  id: string, // id to match against once idType is known
  idType: SignUpIdType,
}

export type CreateSignUpRequest = Omit<SignUpData, '_id' | 'signUpId'>;

export type UpdateSignUpRequest = Omit<SignUpData, '_id' | 'signUpId'>;
