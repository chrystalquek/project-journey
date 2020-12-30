import { EventData } from 'types/event';

export type LoginRequest = {
  email: string
  password: string
}

export type QueryParams = {
  pageNo?: number
  size?: number
  [field: string]: any
}

export type PostEventRequest = EventData;
