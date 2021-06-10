import User, { NewUserData, UserData } from '../models/User';
import { VolunteerData, VolunteerUserData } from '../models/Volunteer';
import volunteerService from './volunteer';

const createUser = async (userData: NewUserData): Promise<UserData> => {
  const userSchemaData = new User({
    ...userData,
  });

  const user = await userSchemaData.save();
  return user;
};

const getUserByEmail = async (email: string): Promise<UserData> => {
  const volunteer = await volunteerService.getVolunteer(email);
  const user = await User.findOne({ _id: volunteer.userId });
  if (!user) {
    throw new Error(`User with email: ${email} is not found`);
  }
  return user;
};

const updateUser = async (id: string, userData: Partial<UserData>): Promise<UserData> => {
  const savedUserData = await User.findOneAndUpdate(
    { _id: id },
    userData,
    { new: true },
  );
  if (!savedUserData) {
    throw new Error(`User with id: ${id} is not found`);
  }
  return savedUserData;
};

const deleteUser = async (id: string): Promise<void> => {
  await User.findOneAndDelete({
    _id: id,
  });
};

const addAdminRemarks = async (volunteerData: VolunteerData): Promise<VolunteerUserData> => {
  const user = await getUserByEmail(volunteerData.email);
  return { ...volunteerData, administratorRemarks: user.administratorRemarks };
};

export default {
  createUser, getUser: getUserByEmail, updateUser, deleteUser, addAdminRemarks,
};
