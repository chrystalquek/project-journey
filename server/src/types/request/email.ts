import { EmptyBody, EmptyParams, EmptyQuery, Request } from "./common";

type SendFeedbackRequestParams = {
  userId: string;
  eventId: string;
};

export type SendFeedbackRequest = Request<
  EmptyBody,
  EmptyQuery,
  SendFeedbackRequestParams
>;

export type SendMassFeedbackRequest = Request;

type SendCancelEventParams = {
  userId: string;
  eventId: string;
};

export type SendCancelEventRequest = Request<
  EmptyBody,
  EmptyQuery,
  SendCancelEventParams
>;

type SendForgotPasswordBody = {
  email: string;
};

export type SendForgotPasswordRequest = Request<
  SendForgotPasswordBody,
  EmptyQuery,
  EmptyParams
>;
