import { CommitmentApplicationData } from '../../models/CommitmentApplication';
import { Response } from '../response/common';

export type CreateCommitmentApplicationResponse = Response<CommitmentApplicationData>

export type GetCommitmentApplicationsResponse = Response<{ data: CommitmentApplicationData[] }>

export type UpdateCommitmentApplicationResponse = Response<CommitmentApplicationData>

export type DeleteCommitmentApplicationResponse = Response
