export type LoginRequest = {
  email: string
  password: string
}

export type QueryOptions = {
  pageNo: number
  size: number
}

export type VolunteerQueryOptions = QueryOptions & { volunteerType: string }
