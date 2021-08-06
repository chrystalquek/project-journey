/* eslint-disable max-len */
import mongoose from "mongoose";
import Volunteer, {
  NewVolunteerData,
  VolunteerData,
  VolunteerType,
  VOLUNTEER_TYPE,
} from "../models/Volunteer";
import userService from "./user";

// Helper methods
export const doesUserEmailExist = async (email: string): Promise<boolean> => {
  const user = await Volunteer.findOne({
    email,
  });
  return !user;
};

/**
 * Creates new volunteer for both ad-hoc/committed
 * @param volunteerData new volunteer data
 */
const createVolunteer = async (
  volunteerData: NewVolunteerData
): Promise<VolunteerData> => {
  // create user first
  const user = await userService.createUser({
    password: volunteerData.password,
    administratorRemarks: volunteerData.administratorRemarks,
  });

  // add userId to volunteer
  const volunteerSchemaData = new Volunteer({
    ...volunteerData,
    userId: mongoose.Types.ObjectId(user._id),
  });

  const volunteer = await volunteerSchemaData.save();

  return volunteer;
};

/**
 * Gets volunteer details for specific user.
 * Throws error if user doesn't exist
 * @param email User email to be searched
 */
const getVolunteer = async (email: string): Promise<VolunteerData> => {
  const volunteer = await Volunteer.findOne({
    email,
  })
    .lean()
    .exec();

  if (!volunteer) {
    throw new Error(`Volunteer with email: ${email} not found`);
  }

  return volunteer;
};

/**
 * Gets volunteer details for specific user.
 * Throws error if user doesn't exist
 * @param id User id to be searched
 */
const getVolunteerById = async (id: string): Promise<VolunteerData> => {
  const volunteer = await Volunteer.findById(id);
  if (!volunteer) {
    throw new Error(`Volunteer with id: ${id} not found`);
  }

  return volunteer;
};

/**
 * Gets all volunteer details.
 * Filter by volunteerType and name inclusive
 * Sort by field specified if any
 */
const getAllVolunteers = async (
  volunteerType?: VolunteerType[],
  name?: string,
  sort?: string,
  skip?: number,
  limit?: number
): Promise<{ data: VolunteerData[]; count: number }> => {
  // no of volunteers that match name (if any)
  const count = await Volunteer.find(
    name ? { name: { $regex: `.*${name}.*`, $options: "xis" } } : {}
  )
    .find({ volunteerType: { $in: volunteerType ?? VOLUNTEER_TYPE } })
    .countDocuments();

  // get only part of the collection cos of pagination
  const volunteers = await Volunteer.find(
    name ? { name: { $regex: `.*${name}.*`, $options: "xis" } } : {}
  )
    .find({ volunteerType: { $in: volunteerType ?? VOLUNTEER_TYPE } })
    .sort(sort ? { [sort]: 1 } : {})
    .skip(skip ?? 0)
    .limit(limit ?? 0)
    .lean()
    .exec();

  return { data: volunteers, count };
};

/**
 * Retrieves volunteers from the specified volunteers ids.
 * A helper function for getPendingVolunteers and updateCommitmentApplication
 * @param ids array of volunteer ids
 * @return corresponding volunteers
 */
const getVolunteersByIds = async (
  ids: string[]
): Promise<Array<VolunteerData>> => {
  try {
    const volunteers = await Volunteer.find({
      _id: { $in: ids },
    });
    return volunteers;
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
const updateVolunteerDetails = async (
  email: string,
  updatedVolunteerData: Partial<VolunteerData>
) => {
  await getVolunteer(email);
  const savedVolunteerData = await Volunteer.findOneAndUpdate(
    { email },
    updatedVolunteerData,
    { new: true }
  );
  return savedVolunteerData;
};

/**
 * Updates volunteer data
 * @param id
 * @param updatedVolunteerData
 */
const updateVolunteer = async (
  id: string,
  updatedVolunteerData: Partial<VolunteerData>
): Promise<VolunteerData> => {
  const savedVolunteerData = await Volunteer.findOneAndUpdate(
    { _id: id },
    updatedVolunteerData,
    { new: true }
  );
  if (!savedVolunteerData) {
    throw new Error(`Volunteer with id: ${id} not found`);
  }
  return savedVolunteerData;
};

/**
 * Removes volunteer from DB (hard delete)
 * @param email User email to be used to search
 */
const deleteVolunteer = async (email: string): Promise<void> => {
  const volunteer = await Volunteer.findOneAndDelete({
    email,
  });

  if (!volunteer) {
    throw new Error(`Volunteer with email: ${email} not found`);
  }

  userService.deleteUser(volunteer.userId);
};

export default {
  createVolunteer,
  deleteVolunteer,
  getAllVolunteers,
  getVolunteer,
  getVolunteerById,
  getVolunteersByIds,
  updateVolunteerDetails,
  updateVolunteer,
};
