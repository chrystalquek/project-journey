import express from 'express';

import { body } from 'express-validator';
import {
  teamCreate, teamRead, teamUpdate, teamDelete,
} from '../services/team';

export type TeamCreate = 'TeamCreate';
export type TeamRead = 'TeamRead';
export type TeamUpdate = 'TeamUpdate';
export type TeamDelete = 'TeamDelete';
export type TeamMethod = TeamCreate | TeamRead | TeamUpdate | TeamDelete;

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

const createTeam = async (req: express.Request, res: express.Response) => {
  const result = await teamCreate(req.body);
  res.send(result);
};

const readTeam = async (req: express.Request, res: express.Response) => {
  const result = await teamRead({ id: req.params.id });
  res.send(result);
};

const updateTeam = async (req: express.Request, res: express.Response) => {
  const result = await teamUpdate({ id: req.params.id, ...req.body });
  res.send(result);
};

const deleteTeam = async (req: express.Request, res: express.Response) => {
  const result = await teamDelete({ id: req.params.id, ...req.body });
  res.send(result);
};

export default {
  createTeam,
  readTeam,
  updateTeam,
  deleteTeam,
  getValidations,
};
