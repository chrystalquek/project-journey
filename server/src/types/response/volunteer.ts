import { GetVolunteerData } from "../../models/Volunteer";
import { Response } from "./common";

export type CreateVolunteerResponse = Response<GetVolunteerData>;

export type GetVolunteerResponse = Response<GetVolunteerData>;

export type GetVolunteersResponse = Response<{
  data: GetVolunteerData[];
  count: number;
}>;

export type GetPendingVolunteersResponse = Response<{
  data: GetVolunteerData[];
}>;

export type GetVolunteersByIdsResponse = Response<{ data: GetVolunteerData[] }>;

export type UpdateVolunteerResponse = Response<GetVolunteerData>;

export type DeleteVolunteerResponse = Response;
