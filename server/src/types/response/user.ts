import { Response } from '../response/common';

export type LoginResponse = Response<{ token: string }>

export type UpdatePasswordResponse = Response
