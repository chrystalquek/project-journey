import { body } from 'express-validator';

// TODO @everyone - fill as required
const getValidations = (method: TeamMethod) => {
  switch (method) {
    case 'TeamCreate':
      return [
        body('members', 'members must be a string array').isArray(),
        body('leader', 'leader cannot be empty').not().isEmpty(),
        body('name', 'name cannot be empty').not().isEmpty(),
      ];
    default:
      return [];
  }
};

export default getValidations;
