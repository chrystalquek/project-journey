import { EmptyQuery, Request } from "./common";

type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginRequest = Request<LoginRequestBody>;

type UpdatePasswordRequestBody = {
  email: string;
  password: string;
  newPassword: string;
};

export type UpdatePasswordRequest = Request<UpdatePasswordRequestBody>;

type TokenParams = { token: string };

type ResetPasswordRequestBody = {
  newPassword: string;
};

export type ResetPasswordRequest = Request<
  ResetPasswordRequestBody,
  EmptyQuery,
  TokenParams
>;
