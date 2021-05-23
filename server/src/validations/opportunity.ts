import { body } from 'express-validator';

type OpportunityValidatorMethod = 'createOpportunity';

const getValidations = (method: OpportunityValidatorMethod) => {
  switch (method) {
    case 'createOpportunity': {
      return [
        body('positions', 'positions does not exist').exists(),
        body('photo', 'photo does not exist').exists(),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
