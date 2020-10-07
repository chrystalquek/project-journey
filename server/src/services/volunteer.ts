/* eslint-disable max-len */
import mongoose from 'mongoose';
import { VolunteerData } from '../types';
import Volunteer from '../models/Volunteer';

export const addNewVolunteer = async (volunteerData: VolunteerData) => {
  const volunteerSchemaData = new Volunteer({
    _id: new mongoose.Types.ObjectId(),
    full_name: volunteerData.fullName,
    password: volunteerData.password, // password is hashed automatically
  });

  await volunteerSchemaData.save();
};

/**
 * Finds the volunteer with given id, or null if not found.
 */
// TODO: Better error handling here
export const getVolunteer = async (volunteerId: number) => Volunteer.findById({ _id: volunteerId })
  .catch((err) => console.error(err));

// TODO: Better error handling here
export const updateVolunteer = async (volunteerId: number, volunteerData: VolunteerData) => Volunteer.findByIdAndUpdate(volunteerId, volunteerData)
  .catch((err) => console.error(err));

// TODO: Better error handling here
export const deleteVolunteer = async (volunteerId: number) => Volunteer.findByIdAndDelete(volunteerId)
  .catch((err) => console.error(err));
