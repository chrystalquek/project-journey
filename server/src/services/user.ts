import Volunteer, { VolunteerData } from '../models/Volunteer';

export const getUser = async (email: string): Promise<VolunteerData> => {
  const user = await Volunteer.findOne({ email }).populate('commitmentApplicationIds');
  if (!user) {
    throw new Error(`User with email: ${email} is not found`);
  }
  return user;
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
