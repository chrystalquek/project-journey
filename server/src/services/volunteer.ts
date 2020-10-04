import mongoose from "mongoose"
import console from "console"
import { VolunteerData } from '../types'
import Volunteer from '../models/Volunteer'

export const addNewVolunteer = async (volunteerData: VolunteerData) => {
  const volunteerSchemaData = new Volunteer({
    _id: new mongoose.Types.ObjectId(),
    full_name: volunteerData.fullName,
    password: volunteerData.password, // password is hashed automatically
  })

  const result = await volunteerSchemaData.save()
}

/**
 * Finds the volunteer with given id, or null if not found.
 */
export const getVolunteer = async (volunteerId: number) => {
  return Volunteer.findById({_id: volunteerId})
    .catch(err => console.error(err));
}

export const updateVolunteer = async (volunteerId: number, volunteerData: VolunteerData) => {
  return Volunteer.findByIdAndUpdate(volunteerId, volunteerData)
    .catch(err => console.error(err));
}

export const deleteVolunteer = async (volunteerId: number) => {
  return Volunteer.findByIdAndDelete(volunteerId)
    .catch(err => console.error(err));
}
