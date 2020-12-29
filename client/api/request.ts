import { EventData } from 'types/event';

export type LoginRequest = {
  email: string
  password: string
}

export type PostEventRequest = EventData;
