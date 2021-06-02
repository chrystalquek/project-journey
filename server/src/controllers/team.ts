import { Response, Request } from 'express';

import {
  teamCreate, teamRead, teamUpdate, teamDelete,
} from '../services/team';

export type TeamCreate = 'TeamCreate';
export type TeamRead = 'TeamRead';
export type TeamUpdate = 'TeamUpdate';
export type TeamDelete = 'TeamDelete';
export type TeamMethod = TeamCreate | TeamRead | TeamUpdate | TeamDelete;

const createTeam = async (req: Request, res: Response): Promise<void> => {
  const result = await teamCreate(req.body);
  res.send(result);
};

const getTeam = async (req: Request, res: Response): Promise<void> => {
  const result = await teamRead({ id: req.params.id });
  res.send(result);
};

const updateTeam = async (req: Request, res: Response): Promise<void> => {
  const result = await teamUpdate({ id: req.params.id, ...req.body });
  res.send(result);
};

const deleteTeam = async (req: Request, res: Response): Promise<void> => {
  const result = await teamDelete({ id: req.params.id, ...req.body });
  res.send(result);
};

export default {
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
};
