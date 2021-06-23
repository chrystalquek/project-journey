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
        body('volunteerId', 'volunteer ID does not exist').exists(),
        body('volunteerId', 'volunteer ID is not a object id').isMongoId(),// not sure if the ref to Volunteer needs to be checked as well
        body('status', 'status does not exist').exists(),
        body('status', 'status is not a string').isString(), // not sure if it's redundant as enum is checked on next line and all members of this enum are string
        body('status', 'status is not a valid commitment application status').custom((value, { req }) => value in COMMITMENT_APPLICATION_STATUS), // tried to use isIn() but it's not for readonly[] COMMITMENT_APPLICATION_STATUS
        body('createdAt', 'time of creation does not exist').exists(),
        body('createdAt', 'time of creation is of wrong date format').isISO8601(),
      ];
    }
    case 'updateCommitmentApplication': {
      return [
        body('volunteerId', 'volunteer ID is not a object id').isMongoId(),// not sure if the ref to Volunteer needs to be checked as well
        body('status', 'status does not exist').exists(),
        body('status', 'status is not a string').isString(), // not sure if it's redundant as enum is checked on next line and all members of this enum are string
        body('status', 'status is not a valid commitment application status').custom((value, { req }) => value in COMMITMENT_APPLICATION_STATUS), // tried to use isIn() but it's not for readonly[] COMMITMENT_APPLICATION_STATUS
        body('createdAt', 'time of creation does not exist').exists(),
        body('createdAt', 'time of creation is of wrong date format').isISO8601(),
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
