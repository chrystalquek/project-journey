import { body, ValidationChain } from 'express-validator';
import { COMMITMENT_APPLICATION_STATUS } from '../models/CommitmentApplication';
import { stringEnumValidator } from './global';

type CommitmentApplicationValidatorMethod = 'createCommitmentApplication' | 'readCommitmentApplication' | 'updateCommitmentApplication'

export const getValidations = (method: CommitmentApplicationValidatorMethod): ValidationChain[] => {
  switch (method) {
    case 'createCommitmentApplication': {
      return [
        body('volunteerId', 'volunteer ID does not exist').exists(),
        body('volunteerId', 'volunteer ID is not a string').isString(),
        body('status', 'status does not exist').exists(),
        body('status', 'status is not valid').custom((status: string) => stringEnumValidator(
          COMMITMENT_APPLICATION_STATUS,
          'Commitment Application Status',
          status,
        )),
        body('createdAt', 'createdAt is of wrong date format').isISO8601(),
      ];
    }
    case 'updateCommitmentApplication': {
      return [
        body('volunteerId', 'volunteer ID is not a string').isString(),
        body('status', 'status is not a string').isString(),
        body('status', 'status is not valid').isString().custom((status: string) => stringEnumValidator(
          COMMITMENT_APPLICATION_STATUS,
          'Commitment Application Status',
          status,
        )),
        body('createdAt', 'createdAt is of wrong date format').isISO8601(),
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
