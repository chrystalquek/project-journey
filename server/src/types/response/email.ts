import { Response } from "./common";

type SendFeedbackRequestResponseBody = {
  userId: string;
  eventId: string;
};

export type SendFeedbackRequestResponse =
  Response<SendFeedbackRequestResponseBody>;

export type SendMassFeedbackRequestResponse = Response;

type SendCancelEventResponseBody = {
  userId: string;
  eventId: string;
};

export type SendCancelEventResponse = Response<SendCancelEventResponseBody>;

type SendBuddyResponseBody = {
  userId: string;
  buddyId: string;
}

export type SendBuddyResponse = Response<SendBuddyResponseBody>;