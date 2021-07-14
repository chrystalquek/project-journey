import { body, query, param, ValidationChain } from 'express-validator';
import { stringArrayValidator } from './global';

type OpportunityValidatorMethod = 'createOpportunity' | 'updateOpportunity' | 'readOpportunity' | 'deleteOpportunity';

const id = param('id').exists().withMessage('Id is required').isString().withMessage('Id must be a string');
const positions = body('positions').exists().withMessage('Positions is required').isArray().withMessage('Positions must be an array')
  .custom((positions: Array<any>) => stringArrayValidator(positions))
  .withMessage('Positions must be an array of strings');
const photo = body('photo').exists().withMessage('Photo is required').isString().withMessage('Photo must be represented by a string');

const getValidations = (method: OpportunityValidatorMethod): ValidationChain[] => {
  switch (method) {
    case 'createOpportunity': {
      return [
        positions,
        photo
      ];
    }
    case 'updateOpportunity': {
      return [
        id,
        positions.optional(),
        photo.optional()
      ];
    }
    case 'readOpportunity': {
      return [
        id
      ];
    }
    case 'deleteOpportunity': {
      return [
        id
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
