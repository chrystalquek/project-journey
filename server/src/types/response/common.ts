import { Response as ExpressResponse } from 'express';

type EmptyBody = {}

export type Response<ReqBody = EmptyBody> = ExpressResponse<ReqBody | { message: any } | { errors: [{ msg: string }] } | { errors: [{ message: string }] }>