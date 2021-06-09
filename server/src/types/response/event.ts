import { EventData } from '../../models/event';
import { Response } from '../response/common';

export type CreateEventResponse = Response<EventData>

export type GetEventResponse = Response<EventData>

export type GetEventsResponse = Response<{ data: EventData[] }>

export type GetSignedUpEventsResponse = Response<{ data: EventData[] }>

export type UpdateEventResponse = Response<EventData>

export type CancelEventResponse = Response

export type DeleteEventResponse = Response
