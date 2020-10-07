import { VolunteerData } from '../types';
import Volunteer from '../models/Volunteer';

export const checkUserExists = async (fullName: String): Promise<VolunteerData> => {
  try {
    const user = await Volunteer.findOne({ full_name: fullName });
    if (!user) {
      throw new Error('User is not found.');
    }
    return user;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const readAllUsers = async (): Promise<VolunteerData[]> => {
  try {
    const user = await Volunteer.find({});
    if (!user) {
      throw new Error('User is not found.');
    }
    return user;
  } catch (err) {
    throw new Error(err.msg);
  }
};
