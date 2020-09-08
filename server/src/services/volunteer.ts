import mongoose from "mongoose"
import { VolunteerData } from '../types'
import Volunteer from '../models/Volunteer'

export const addNewVolunteer = async (volunteerData: VolunteerData) => {
  const volunteerSchemaData = new Volunteer({
    _id: new mongoose.Types.ObjectId(),
    full_name: volunteerData.fullName,
    password: volunteerData.password, // hash password
  })

  const result = await volunteerSchemaData.save()
}

