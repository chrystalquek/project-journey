// NOTE do not abuse this file. Most types should be in models/controller files
import { VolunteerData } from "../models/Volunteer"

export type EnvironmentConstants = {
    port: number,
    env: string
    disableAuthentication: boolean
}

// TODO removed
export type TeamData = {
    leader: string,
    name: string,
    members: [string]
}

export type ResponseJSON = {
    message?: string
    errors?: Array<any>
}

/**
 * Individual error type for saving in DB
 * Error type is at per field level
 * e.g: 'name', 'password'
 */
export interface MongooseSaveSubError {
    name: string
    message: string
    properties: {
        message: string
        type: string
        path: string
        value: string
    }
    kind: string
    path: string
    value: string
}

/**
 * General error type for saving in DB
 */
export type MongooseSaveError = {
    errors: Record<string, MongooseSaveSubError>
    _message: string
}

// extend express.Request type with user object
/* eslint-disable no-unused-vars */
declare global {
    namespace Express {
        interface Request {
            user: VolunteerData
        }
    }
}
/* eslint-enable no-unused-vars */
