/* eslint-disable max-len */
import mongoose from 'mongoose';
import { QueryParams, VolunteerData } from '../types';
import Volunteer from '../models/Volunteer';
import volunteerUtil from '../helpers/volunteer';

// Helper methods
export const doesUserEmailExist = async (email: string): Promise<boolean> => {
  const user = await Volunteer.findOne({
    email,
  });
  return !user;
};

/**
 * Creates new volunteer for both ad-hoc/committed
 * @param volunteerData new volunteer data
 */
const createVolunteer = async (volunteerData: VolunteerData): Promise<void> => {
  const volunteerSchemaData = new Volunteer({
    ...volunteerData,
    _id: new mongoose.Types.ObjectId(),
  });

  await volunteerSchemaData.save();
};

/**
 * Gets volunteer details for specific user.
 * Throws error if user doesn't exist
 * @param email User email to be searched
 */
const getVolunteer = async (email: string): Promise<Partial<VolunteerData>> => {
  const volunteer = await Volunteer.findOne({
    email,
  }).lean().exec();

  if (!volunteer) {
    throw new Error(`Volunteer with email: ${email} not found`);
  }

  return volunteerUtil.extractVolunteerDetails(volunteer);
};

/**
 * Gets volunteer details for specific user.
 * Throws error if user doesn't exist
 * @param id User id to be searched
 */
const getVolunteerById = async (id: string): Promise<Partial<VolunteerData>> => {
  const volunteer = await Volunteer.findById(id).populate('commitmentApplicationIds').lean().exec();
  if (!volunteer) {
    throw new Error(`Volunteer with id: ${id} not found`);
  }

  return volunteerUtil.extractVolunteerDetails(volunteer);
};

/**
 * Gets all volunteer details.
 */
const getAllVolunteers = async (query: QueryParams) => {
  // no of volunteers that match name (if any)
  const count = await (query.name ? Volunteer.find({ name: { $regex: `.*${query.name}.*`, $options: 'xis' } }) : Volunteer.find({}))
    .find({ volunteerType: { $in: query.volunteerType || [] } })
    .countDocuments();

  // get only part of the collection cos of pagination
  let volunteers;
  if (query.skip && query.limit) {
    volunteers = await (query.name ? Volunteer.find({ name: { $regex: `.*${query.name}.*`, $options: 'xis' } }) : Volunteer.find({}))
      .find({ volunteerType: { $in: query.volunteerType || [] } })
      .sort({ [query.sort]: 1 })
      .skip(query.skip).limit(query.limit)
      .lean()
      .exec();
  } else {
    volunteers = await (query.name ? Volunteer.find({ name: { $regex: `.*${query.name}.*`, $options: 'xis' } }) : Volunteer.find({}))
      .find({ volunteerType: { $in: query.volunteerType || [] } })
      .sort({ [query.sort]: 1 })
      .lean().exec();
  }

  const data = volunteers.map((volunteer: VolunteerData) => volunteerUtil.extractVolunteerDetails(volunteer));

  return { data, count };
};

/**
 * Retrieves volunteers from the specified volunteers ids.
 * A helper function for getPendingVolunteers and updateCommitmentApplication
 * @param ids array of volunteer ids
 * @return corresponding volunteers
 */
const getVolunteersByIds = async (ids: string[]): Promise<VolunteerData[]> => {
  try {
    return await Volunteer.find({
      _id: { $in: ids },
    });
  } catch (err) {
    throw new Error(err.msg);
  }
};

// TODO remove below after fixing image
/**
 * Updates volunteer data with email
 * @param email
 * @param updatedVolunteerData
 */
const updateVolunteerDetails = async (email: string, updatedVolunteerData: Partial<VolunteerData>) => {
  await getVolunteer(email);
  const savedVolunteerData = await Volunteer.findOneAndUpdate(
    { email },
    updatedVolunteerData,
    { new: true },
  );
  return savedVolunteerData;
};

/**
 * Updates volunteer data
 * @param id
 * @param updatedVolunteerData
 */
const updateVolunteer = async (id: string, updatedVolunteerData: Partial<VolunteerData>) => {
  await getVolunteerById(id);
  const savedVolunteerData = await Volunteer.findOneAndUpdate(
    { _id: id },
    updatedVolunteerData,
    { new: true },
  );
  return savedVolunteerData;
};

/**
 * Removes volunteer from DB (hard delete)
 * @param email User email to be used to search
 */
const deleteVolunteer = async (email: string): Promise<void> => {
  await Volunteer.findOneAndDelete({
    email,
  });
};

export default {
  createVolunteer, deleteVolunteer, getAllVolunteers, getVolunteer, getVolunteerById, getVolunteersByIds, updateVolunteerDetails, updateVolunteer,
};
