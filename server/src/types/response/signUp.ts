import { SignUpData } from "../../models/SignUp";
import { Response } from "./common";

export type CreateSignUpResponse = Response<SignUpData>;

export type GetSignUpResponse = Response<SignUpData>;

export type GetSignUpsResponse = Response<{ data: SignUpData[] }>;

export type GetPendingSignUpsResponse = Response<{ data: SignUpData[] }>;

export type UpdateSignUpResponse = Response<SignUpData>;

export type DeleteSignUpResponse = Response;
