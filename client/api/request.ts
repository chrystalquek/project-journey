export type LoginRequest = {
  email: string
  password: string
}

export type QueryOptions = {
  pageNo: number
  size: number
  keywords?: string
}
