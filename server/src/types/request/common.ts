import * as core from "express-serve-static-core";
import { Request as ExpressRequest } from "express";

// Documentation:
// Use generics Request<Body, Query, Params> to define Request types. Fill in with EmptyBody, EmptyQuery, EmptyParams with respective components does not exist.
// Must be in order.
// Can leave our other params sometimes e.g. Can define Request<Body> (leave out Query, Params), but cannot define Request<Params> (use Request<EmptyBody, Params> instead)

// https://dev.to/dakdevs/extend-express-request-in-typescript-1693
// https://mariusschulz.com/blog/generic-parameter-defaults-in-typescript

export interface EmptyQuery extends core.Query {}

export interface EmptyParams extends core.ParamsDictionary {}

export interface EmptyBody {}

// note there won't be any compiler errors when accessing other keys of req.params

export interface Request<
  ReqBody = EmptyBody,
  ReqQuery = EmptyQuery,
  URLParams extends EmptyParams = core.ParamsDictionary
> extends ExpressRequest<URLParams, any, ReqBody, ReqQuery> {}

export interface IdParams extends EmptyParams {
  id: string;
}

export type IdRequest = Request<EmptyBody, EmptyQuery, IdParams>;
