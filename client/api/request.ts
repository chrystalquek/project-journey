export type LoginRequest = {
  email: string
  password: string
}

export type QueryParams = {
  pageNo: number
  size: number
  [field: string]: any
}
