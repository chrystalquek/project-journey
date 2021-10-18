import { Response } from "./common";

export type LoginResponse = Response<{ token: string }>;

export type UpdatePasswordResponse = Response;

export type ResetPasswordResponse = Response;
