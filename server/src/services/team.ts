import { Types } from 'mongoose';
import Team, { TeamModel } from '../models/Team';
import { TeamData } from '../types/types';

/**
 * Creates a single team from its given team members.
 * @param body.members an array of volunteer ids.
 * @param body.leader id of the volunteer team leader.
 * @param body.name string team name.
 */
export const teamCreate = async (body: TeamData) => {
  const { members, leader, name } = body;
  try {
    const doc: TeamModel = new Team({
      members: members.map(Types.ObjectId),
      leader: Types.ObjectId(leader),
      name,
    });
    await doc.save().then((created) => console.info(`Created ${created}`));
  } catch (err) {
    console.error(`Error: ${err.msg}`);
  }
};

const teamReadAll = async (): Promise<any> => {
  const teams = Team.find({});
  if (!teams) {
    throw new Error('Error reading teams');
  }
  return teams;
};

const teamReadOne = async (id: string): Promise<any> => {
  const team = await Team.findById(id).lean(true);
  if (!team) {
    throw new Error('Error reading team');
  }
  return team;
};

/**
 * Updates specified team id with given arguments, reusing previous team data if any argument isn't given.
 * @param body.id team to update
 * @param body.members optional array of volunteer ids
 * @param body.leader optional volunteer id
 * @param body.name optional new team name
 */
export const teamUpdate = async (body: { id: string, members?: [string], leader?: string, name?: string }) => {
  const {
    id, members, leader, name,
  } = body;
  try {
    const prev = await teamReadOne(id);
    const updated = {
      members: members ? members.map(Types.ObjectId) : prev.members,
      leader: leader ? Types.ObjectId(leader) : prev.leader,
      name: name || prev.name,
    };
    Team.findByIdAndUpdate(id, updated, (err, doc) => console.info(`Updated ${doc}`));
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

/**
 * Returns the team with given id, or all teams if no id is given.
 * @param body.id the team id to retrieve.
 */
export const teamRead = async (body: { id: string }): Promise<any> => {
  const { id } = body;
  try {
    if (!id) {
      return await teamReadAll();
    }
    return await teamReadOne(id);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

/**
 * Deletes a team given an id.
 */
export const teamDelete = async (body: { id: string }) => {
  const { id } = body;
  try {
    Team.findByIdAndRemove(id, (err, doc) => console.info(`Removed ${doc}`));
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};
