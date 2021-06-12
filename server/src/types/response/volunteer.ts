import { VolunteerPublicData } from '../../models/Volunteer';
import { Response } from '../response/common';

export type CreateVolunteerResponse = Response<VolunteerPublicData>

export type GetVolunteerDetailsByEmailResponse = Response<VolunteerPublicData>

export type GetVolunteerResponse = Response<VolunteerPublicData>

export type GetVolunteersResponse = Response<{ data: VolunteerPublicData[], count: number }>

export type GetPendingVolunteersResponse = Response<{ data: VolunteerPublicData[] }>

export type GetVolunteersByIdsResponse = Response<{ data: VolunteerPublicData[] }>

export type UpdateVolunteerResponse = Response<VolunteerPublicData>

export type DeleteVolunteerResponse = Response
