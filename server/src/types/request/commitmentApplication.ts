import { CommitmentApplicationData, CommitmentApplicationStatus, NewCommitmentApplicationData } from "../../models/CommitmentApplication";
import { EmptyBody, EmptyQuery, Request, IdParams } from "./common";

export type CreateCommitmentApplicationRequest = Request<NewCommitmentApplicationData>

type GetCommitmentApplicationsRequestQuery = {
    status?: CommitmentApplicationStatus
}

export type GetCommitmentApplicationsRequest = Request<EmptyBody, GetCommitmentApplicationsRequestQuery>

export type UpdateCommitmentApplicationRequest = Request<Partial<CommitmentApplicationData>, EmptyQuery, IdParams>