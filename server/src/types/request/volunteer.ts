import { NewVolunteerData, VolunteerData, VolunteerType } from '../../models/Volunteer';
import {
  Request, EmptyBody, EmptyQuery, IdRequest, IdParams,
} from './common';

export type CreateVolunteerRequest = Request<NewVolunteerData>

export type GetVolunteerRequest = IdRequest

type GetVolunteersRequestQuery = {
    volunteerType?: VolunteerType[],
    pageNo?: string,
    size?: string,
    name?: string,
    sort?: string
}

export type GetVolunteersRequest = Request<EmptyBody, GetVolunteersRequestQuery>

export type GetPendingVolunteersRequest = Request

export type GetVolunteersByIdsRequestBody = {
    ids: string[]
}

export type GetVolunteersByIdsRequest = Request<GetVolunteersByIdsRequestBody>

export type UpdateVolunteerRequest = Request<Partial<VolunteerData>, EmptyQuery, IdParams>

export type DeleteVolunteerRequestBody = {
    email: string,
}

export type DeleteVolunteerRequest = Request<DeleteVolunteerRequestBody>
