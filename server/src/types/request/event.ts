import { EventData, EventSearchType, NewEventData } from '../../models/Event';
import { EmptyBody, EmptyQuery, Request, IdParams, IdRequest } from "./common";

export type CreateEventRequest = Request<NewEventData>

export type GetEventRequest = IdRequest

type GetEventsRequestQuery = {
    pageNo?: string,
    size?: string
}
type GetEventsRequestParams = {
    eventType: EventSearchType
}

export type GetEventsRequest = Request<EmptyBody, GetEventsRequestQuery, GetEventsRequestParams>

type GetSignedUpEventsRequestParams = {
    userId: string,
    eventType: EventSearchType
}

export type GetSignedUpEventsRequest = Request<EmptyBody, EmptyQuery, GetSignedUpEventsRequestParams>

export type UpdateEventRequest = Request<Partial<EventData>, EmptyQuery, IdParams>

export type CancelEventRequest = IdRequest

export type DeleteEventRequest = IdRequest
