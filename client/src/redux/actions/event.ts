import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";
import {
  CreateEventRequest,
  GetEventsRequest,
  GetSignedUpEventsRequest,
  UpdateEventRequest,
} from "@api/request";
import { EventData, EventSearchType } from "@type/event";
import { StoreState } from "@redux/store";
import { assert } from "@utils/helpers/typescript";

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (request: CreateEventRequest) => {
    // TODO change this to 1 api call
    const response = await apiClient.createEvent(request);
    await apiClient.createForm({
      eventId: response._id,
      questions: request.questions,
    });
    return response;
  }
);

export const getEventsUpcomingEvent = createAsyncThunk(
  "event/getEventsUpcomingEvent",
  async (request: GetEventsRequest) => {
    const response = await apiClient.getEvents(request);
    return response;
  }
);

// Todo: Merge the APIs in the server into one.
type ListEventsArgs = {
  eventType: EventSearchType;
  onlySignedUp?: boolean;
};
export const listEvents = createAsyncThunk<
  { events: EventData[] },
  ListEventsArgs,
  { state: StoreState }
>("event/listEvents", async ({ eventType, onlySignedUp }, { getState }) => {
  if (!onlySignedUp) {
    const response = await apiClient.getEvents({ eventType });
    return { events: response.data };
  }

  const userId = getState().user.user?._id;
  assert(userId, "UserId must be present!");
  const response = await apiClient.getSignedUpEvents({ userId, eventType });
  return { events: response.data };
});

export const getUpcomingEvents = createAsyncThunk("event/getEvents", async () =>
  apiClient.getEvents({ eventType: "upcoming" })
);

export const getSignedUpEventsUpcomingEvent = createAsyncThunk(
  "event/getSignedUpEventsUpcomingEvent",
  async (request: GetSignedUpEventsRequest) => {
    const response = await apiClient.getSignedUpEvents(request);
    return response;
  }
);

export const getSignedUpEventsPastEvent = createAsyncThunk(
  "event/getSignedUpEventsPastEvent",
  async (request: GetSignedUpEventsRequest) => {
    const response = await apiClient.getSignedUpEvents(request);
    return response;
  }
);

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (_id: string) => {
    const response = await apiClient.getEvent({ _id });
    return response;
  }
);

export const editEvent = createAsyncThunk(
  "event/editEvent",
  async (request: UpdateEventRequest) => {
    const response = await apiClient.updateEvent(request);
    return response;
  }
);

export const cancelEvent = createAsyncThunk(
  "event/cancelEvent",
  async (_id: string) => {
    await apiClient.cancelEvent({ _id });
  }
);
