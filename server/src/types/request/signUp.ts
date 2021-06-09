
import { NewSignUpData, SignUpData, SignUpIdType } from "../../models/SignUp";
import { EmptyBody, EmptyQuery, Request, IdParams, IdRequest } from "./common";

type SignUpIdParams = IdParams & { idType: SignUpIdType }

export type CreateSignUpRequest = Request<NewSignUpData>

export type GetSignUpsRequest = Request<EmptyBody, EmptyQuery, SignUpIdParams>

export type GetPendingSignUpsRequest = Request

export type UpdateSignUpRequest = Request<Partial<SignUpData>, EmptyQuery, SignUpIdParams>

export type DeleteSignUpRequest = Request<EmptyBody, EmptyQuery, SignUpIdParams>
