import { OpportunityData } from "../../models/Opportunity";
import { Response } from "./common";

export type CreateOpportunityResponse = Response<OpportunityData>;

export type GetOpportunityResponse = Response<OpportunityData>;

export type UpdateOpportunityResponse = Response<OpportunityData>;

export type DeleteOpportunityResponse = Response;
