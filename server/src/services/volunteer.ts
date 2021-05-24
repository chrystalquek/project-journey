/* eslint-disable max-len */
import mongoose from 'mongoose';
import { Id } from '../types';
import Volunteer, { VolunteerData, VolunteerType, VOLUNTEER_TYPE } from '../models/Volunteer';
import volunteerUtil from '../helpers/volunteer';
import util from '../helpers/util';

// Helper methods
export const doesUserEmailExist = async (email: string) => {
  const user = await Volunteer.findOne({
    email,
  });
  return !user;
};

/**
 * Creates new volunteer for both ad-hoc/committed
 * @param volunteerData new volunteer data
 */
const addNewVolunteer = async (volunteerData: VolunteerData) => {
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
const getVolunteer = async (email: string) => {
  const volunteer = await Volunteer.findOne({
    email,
  }).lean().exec();

  if (!volunteer) {
    throw new Error(`Volunteer with email: ${email} not found`);
  }

  return util.snakeToCamelCase(volunteerUtil.extractVolunteerDetails(volunteer));
};

/**
 * Gets volunteer details for specific user.
 * Throws error if user doesn't exist
 * @param id User id to be searched
 */
const getVolunteerById = async (id: Id) => {
  const volunteer = await Volunteer.findById(id).populate('commitmentApplicationIds').lean().exec();
  if (!volunteer) {
    throw new Error(`Volunteer with id: ${id} not found`);
  }

  return volunteerUtil.extractVolunteerDetails(volunteer);
};

/**
 * Gets all volunteer details.
 * Filter by volunteerType and name inclusive
 * Sort by field specified if any
 */
const getAllVolunteers = async (volunteerType?: VolunteerType[], name?: string, sort?: string, skip?: number, limit?: number) => {
  // no of volunteers that match name (if any)
  const count = await (name ? Volunteer.find({ name: { $regex: `.*${name}.*`, $options: 'xis' } }) : Volunteer.find({}))
    .find({ volunteerType: { $in: volunteerType ?? VOLUNTEER_TYPE } })
    .countDocuments();

  // get only part of the collection cos of pagination
  const volunteers = await (name ? Volunteer.find({ name: { $regex: `.*${name}.*`, $options: 'xis' } }) : Volunteer.find({}))
    .find({ volunteerType: { $in: volunteerType ?? VOLUNTEER_TYPE } })
    .sort({ [sort ?? '']: 1 })
    .skip(skip ?? 0).limit(limit ?? 0)
    .lean()
    .exec();

  const data = volunteers.map((volunteer: VolunteerData) => (volunteerUtil.extractVolunteerDetails(volunteer)));

  return { data, count };
};

/**
 * Retrieves volunteers from the specified volunteers ids.
 * A helper function for getPendingVolunteers and updateCommitmentApplication
 * @param ids array of volunteer ids
 * @return corresponding volunteers
 */
const readVolunteersByIds = async (ids: Id[]): Promise<VolunteerData[]> => {
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
const updateVolunteer = async (id: Id, updatedVolunteerData: Partial<VolunteerData>) => {
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
const deleteVolunteer = async (email: string) => {
  await Volunteer.findOneAndDelete({
    email,
  });
};

export default {
  addNewVolunteer, deleteVolunteer, getAllVolunteers, getVolunteer, getVolunteerById, readVolunteersByIds, updateVolunteerDetails, updateVolunteer,
};
