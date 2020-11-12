/* eslint-disable max-len */
import mongoose from 'mongoose';
import { VolunteerData } from '../types';
import Volunteer from '../models/Volunteer';

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
    homeAddress,
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
    volunteerRemark,
  } = volunteerData;

  const volunteerSchemaData = new Volunteer({
    _id: new mongoose.Types.ObjectId(),
    full_name: name,
    password,
    identification_number: identificationNumber,
    home_address: homeAddress,
    mobile_number: mobileNumber,
    birthday,
    email,
    social_media_platform: socialMediaPlatform,
    nickname,
    photo_url: photoUrl,
    gender,
    citizenship,
    organization,
    position,
    status,
    role,
    description,
    interests,
    personality,
    voluteer_remark: volunteerRemark,
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
