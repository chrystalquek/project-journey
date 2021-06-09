import { Request } from "./common";

type LoginRequestBody = {
    email: string,
    password: string
}

export type LoginRequest = Request<LoginRequestBody>

type UpdatePasswordRequestBody = {
    email: string,
    password: string,
    newPassword: string
}

export type UpdatePasswordRequest = Request<UpdatePasswordRequestBody>
