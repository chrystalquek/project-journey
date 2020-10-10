import express from 'express';
import mongoose from 'mongoose';
import { TeamData } from "../types";
import console from 'console';

export type TeamCreate = 'TeamCreate';
export type TeamRead = 'TeamRead';
export type TeamUpdate = 'TeamUpdate';
export type TeamDelete = 'TeamDelete';
export type TeamMethod = TeamCreate | TeamRead | TeamUpdate | TeamDelete;

// TODO @everyone - fill as required
const validate = (method: TeamMethod) => {
  if (method as TeamCreate) {
    console.debug("Team create called");
    return [];
  } else if (method as TeamRead) {
    console.debug("Team read called");
    return [];
  } else if (method as TeamUpdate) {
    console.debug("Team update called");
    return [];
  } else if (method as TeamDelete) {
    console.debug("Team delete called");
    return [];
  } else {
    throw new Error("Unknown team method type");
  }
}

const createTeam = async (req: express.Request, res: express.Response) => {
  return;
}

const readTeam = async (req: express.Request, res: express.Response) => {
  return;
}

const updateTeam = async (req: express.Request, res: express.Response) => {
  return;
}

const deleteTeam = async (req: express.Request, res: express.Response) => {
  return;
}

export default {
  createTeam,
  readTeam,
  updateTeam,
  deleteTeam,
}

