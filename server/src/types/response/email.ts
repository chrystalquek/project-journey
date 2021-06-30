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
