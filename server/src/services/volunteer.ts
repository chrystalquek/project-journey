/* eslint-disable max-len */
import mongoose from 'mongoose';
import { QueryParams, VolunteerData } from '../types';
import Volunteer from '../models/Volunteer';
import volunteerUtil from '../helpers/volunteer';

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
export const addNewVolunteer = async (volunteerData: VolunteerData) => {
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
export const getVolunteer = async (email: string) => {
  const volunteer = await Volunteer.findOne({
    email,
  }).lean().exec();

  if (!volunteer) {
    throw new Error(`Volunteer with email: ${email} not found`);
  }

  return volunteerUtil.extractVolunteerDetails(volunteer);
};

/**
 * Gets all volunteer details.
 */
export const getAllVolunteers = async (query: QueryParams) => {
  // no of volunteers that match name (if any)
  const count = await (query.name ? Volunteer.find({ $text: { $search: query.name } }) : Volunteer.find())
    .find({ volunteerType: { $in: query.volunteerType || [] } })
    .countDocuments();

  // get only part of the collection cos of pagination
  const volunteers = await (query.name ? Volunteer.find({ $text: { $search: query.name } }) : Volunteer.find())
    .find({ volunteerType: { $in: query.volunteerType || [] } })
    .skip(query.skip).limit(query.limit).lean()
    .exec();

  const data = volunteers.map((volunteer) => volunteerUtil.extractVolunteerDetails(volunteer));

  return { data, count };
};

/**
 * Gets total number of pending volunteers.
 */
export const getPendingVolunteers = async () => Volunteer.countDocuments({ status: 'pending' });

/**
 * Updates volunteer data with email
 * @param email
 * @param updatedVolunteerData
 */
export const updateVolunteerDetails = async (email: string, updatedVolunteerData: Partial<VolunteerData>) => {
  await getVolunteer(email);
  const savedVolunteerData = await Volunteer.findOneAndUpdate({
    email,
  }, updatedVolunteerData, { new: true });
  return savedVolunteerData
};

/**
 * Removes volunteer from DB (hard delete)
 * @param email User email to be used to search
 */
export const deleteVolunteer = async (email: string) => {
  await Volunteer.findOneAndDelete({
    email,
  });
};

export default {
  addNewVolunteer, deleteVolunteer, getAllVolunteers, getPendingVolunteers, getVolunteer, updateVolunteerDetails,
};
