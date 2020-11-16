/* eslint-disable max-len */
import mongoose from 'mongoose';
import { VolunteerData } from '../types';
import Volunteer from '../models/Volunteer';
import volunteerUtil from '../helpers/volunteer';

// Helper methods
export const isUserEmailUnique = async (email: string) => {
  const user = await Volunteer.findOne({
    email,
  });
  return !user;
};

export const addNewVolunteer = async (volunteerData: VolunteerData) => {
  const {
    name,
    password,
    identificationNumber,
    address,
    mobileNumber,
    birthday,
    email,
    socialMediaPlatform,
    nickname,
    photoUrl,
    gender,
    citizenship,
    organization,
    position,
    status,
    role,
    description,
    interests,
    personality,
    volunteerRemarks,
  } = volunteerData;

  const volunteerSchemaData = new Volunteer({
    _id: new mongoose.Types.ObjectId(),
    name,
    password,
    identificationNumber,
    address,
    mobileNumber,
    birthday,
    email,
    socialMediaPlatform,
    nickname,
    photoUrl,
    gender,
    citizenship,
    organization,
    position,
    status,
    role,
    description,
    interests,
    personality,
    volunteerRemarks,
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

// TODO: Better error handling here
export const updateVolunteer = async (volunteerId: number, volunteerData: VolunteerData) => Volunteer.findByIdAndUpdate(volunteerId, volunteerData)
  .catch((err) => console.error(err));

// TODO: Better error handling here
export const deleteVolunteer = async (volunteerId: number) => Volunteer.findByIdAndDelete(volunteerId)
  .catch((err) => console.error(err));
