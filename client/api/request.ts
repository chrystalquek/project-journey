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
}

export type LoginRequest = {
  email: string
  password: string
}
