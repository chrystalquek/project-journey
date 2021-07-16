import { Response as ExpressResponse } from "express";

// Documentation:
// Use generics Response<Body> to define Response types.
// Can leave out Body (will default to EmptyBody)

type EmptyBody = {};

export type Response<ReqBody = EmptyBody> = ExpressResponse<
  | ReqBody
  | { message: any }
  | { errors: [{ msg: string }] }
  | { errors: [{ message: string }] }
>;
