import { body } from 'express-validator';

type TeamValidatorMethod = 'createTeam' | 'updateTeam' | 'readTeam' | 'deleteTeam';
// TODO @everyone - fill as required
const getValidations = (method: TeamValidatorMethod) => {
  switch (method) {
    case 'createTeam':
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
