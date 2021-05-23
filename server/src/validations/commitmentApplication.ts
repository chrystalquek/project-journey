import { body, ValidationChain } from 'express-validator';
import { COMMITMENT_APPLICATION_STATUS } from '../models/CommitmentApplication';
import { stringEnumValidator } from './global';

type CommitmentApplicationValidatorMethod = 'createCommitmentApplication' | 'readCommitmentApplication' | 'updateCommitmentApplication'

const commitmentApplicationStatus: ValidationChain = body('status')
  .isString()
  .custom((status: string) => stringEnumValidator(
    COMMITMENT_APPLICATION_STATUS,
    'Commitment Application Status',
    status,
  ));

export const getValidations = (method: CommitmentApplicationValidatorMethod): ValidationChain[] => {
  switch (method) {
    case 'createCommitmentApplication': {
      return [
        commitmentApplicationStatus,
      ];
    }
    case 'updateCommitmentApplication': {
      return [
        commitmentApplicationStatus,
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
