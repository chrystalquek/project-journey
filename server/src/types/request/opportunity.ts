
import { NewOpportunityData, OpportunityData } from "../../models/Opportunity";
import { EmptyQuery, Request, IdParams, IdRequest } from "./common";

export type CreateOpportunityRequest = Request<NewOpportunityData>

export type GetOpportunityRequest = IdRequest

export type UpdateOpportunityRequest = Request<Partial<OpportunityData>, EmptyQuery, IdParams>

export type DeleteOpportunityRequest = IdRequest
