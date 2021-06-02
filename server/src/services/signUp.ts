import SignUp, { SignUpData, SignUpIdType, SignUpStatus } from '../models/SignUp';
import Event, { RoleData } from '../models/Event';
import emailService from './email';

const INVALID_SIGN_UP_ID_TYPE = 'Invalid sign up id type';
type UpdateEventVolunteersAction = 'add' | 'remove' | 'replace'

const createSignUp = async (signUpData: Omit<SignUpData, '_id'>) => {
  try {
    const signUpSchemaData = new SignUp({
      eventId: signUpData.eventId,
      userId: signUpData.userId,
      status: signUpData.status,
      preferences: signUpData.preferences,
      isRestricted: signUpData.isRestricted,
    });
    await signUpSchemaData.save();

    emailService.sendEmail('WAITLIST_TO_CONFIRMED', signUpData.userId, signUpData.eventId);
    return { signUpId: signUpSchemaData._id };
  } catch (err) {
    throw new Error(err.msg);
  }
};

const getSignUps = async (id: string, idType: SignUpIdType): Promise<SignUpData[]> => {
  try {
    let signUps: SignUpData[];
    switch (idType) {
      case 'signUpId':
        signUps = await SignUp.find({ _id: id });
        break;
      case 'eventId':
        signUps = await SignUp.find({ eventId: id });
        break;
      case 'userId':
        signUps = await SignUp.find({ userId: id });
        break;
      default: throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    return signUps;
  } catch (err) {
    throw new Error(err.msg);
  }
};

const getPendingSignUps = async () => {
  try {
    return SignUp.find({ status: 'pending' });
  } catch (err) {
    throw new Error(err.msg);
  }
};

/**
 * Checks if the SignUpStatus is of type ['accepted', acceptedRole]
 * @param status either 'pending', 'rejected', or ['accepted', acceptedRole]
 */
export const checkIfAccepted = (status: SignUpStatus): boolean => Array.isArray(status) && status[0] === 'accepted' && status.length === 2;

/**
 * Adds a volunteer id to event.roles.volunteers
 * @param roles event.roles
 * @param newRoleName name of the new role
 * @param volunteerId user id of the volunteer to be added
 */
const addEventVolunteers = (roles: Array<RoleData>, newRoleName: string, volunteerId: string) => {
  const updatedRoles = roles.map((role) => {
    if (role.name === newRoleName) {
      role.volunteers.push(volunteerId);
    }
    return role;
  });
  return updatedRoles;
};

/**
 * Removes a volunteer id from event.roles.volunteers
 * @param roles event.roles
 * @param oldRoleName name of the previous role
 * @param volunteerId user id of the volunteer to be removed
 */
const removeEventVolunteers = (roles: RoleData[], oldRoleName: string,
  volunteerId: string): RoleData[] => {
  const updatedRoles = roles.map((role) => {
    if (role.name === oldRoleName) {
      const index = role.volunteers.indexOf(volunteerId);

      if (index === -1) {
        throw new Error('Volunteer is not found in the specified event.');
      }

      role.volunteers.splice(index, 1);
    }
    return role;
  });
  return updatedRoles;
};

/**
 * Updates event roles, specifically event.roles.volunteers, upon sign up status change.
 * @param eventId id of the corresponding event
 * @param volunteerId  user id of the volunteer
 * @param oldRoleName previous accepted role, if any
 * @param newRoleName new accepted role, if any
 * @param actionType either 'add', 'remove', or 'replace'
 */
const updateEventRoles = async (eventId: string, volunteerId: string, oldRoleName: string,
  newRoleName: string, actionType: UpdateEventVolunteersAction): Promise<void> => {
  try {
    const unupdatedEvent = await Event.findById(eventId);
    let eventRoles: RoleData[];

    if (unupdatedEvent && unupdatedEvent.roles) {
      switch (actionType) {
        case 'add':
          eventRoles = addEventVolunteers(unupdatedEvent.roles, newRoleName, volunteerId);
          break;
        case 'remove':
          eventRoles = removeEventVolunteers(unupdatedEvent.roles, oldRoleName, volunteerId);
          break;
        case 'replace':
          eventRoles = addEventVolunteers(unupdatedEvent.roles, newRoleName, volunteerId);
          eventRoles = removeEventVolunteers(eventRoles, oldRoleName, volunteerId);
          break;
        default:
          throw new Error('Invalid action type');
      }

      await Event.findOneAndUpdate({ _id: eventId }, { $set: { roles: eventRoles } });
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

/**
 * Update sign up (and corresponding event when necessary)
 * @param id one of the ids in the sign up
 * @param idType type of the specified id
 * @param updatedFields updated sign up data
 */
const updateSignUp = async (id: string, idType: SignUpIdType,
  updatedFields: SignUpData): Promise<void> => {
  try {
    let oldFields;
    switch (idType) {
      case 'signUpId':
        oldFields = await SignUp.findOneAndUpdate(
          { _id: id },
          { $set: updatedFields },
        );
        break;
      case 'eventId':
        oldFields = await SignUp.findOneAndUpdate(
          { eventId: id },
          { $set: updatedFields },
        );
        break;
      case 'userId':
        oldFields = await SignUp.findOneAndUpdate(
          { userId: id },
          { $set: updatedFields },
        );
        break;
      default:
        throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    /** Add, remove, or replace volunteer from Event.volunteers array if SignUp.status changes */
    /** status is an array if the sign up is accepted i.e. ["accepted", string] */

    /** Not accepted --> Not accepted : No change */
    if (!checkIfAccepted(oldFields.status) && !checkIfAccepted(updatedFields.status)) {
      return;
    }

    /** Not accepted --> Accepted : Add */
    if (!checkIfAccepted(oldFields.status) && checkIfAccepted(updatedFields.status)) {
      updateEventRoles(oldFields.eventId, oldFields.userId,
        '', updatedFields.status[1], 'add');

      emailService.sendEmail('WAITLIST_TO_CONFIRMED', updatedFields.userId, updatedFields.eventId);
    }

    /** Accepted --> Not Accepted : Remove */
    if (checkIfAccepted(oldFields.status) && !checkIfAccepted(updatedFields.status)) {
      updateEventRoles(oldFields.eventId, oldFields.userId,
        oldFields.status[1], '', 'remove');
    }

    /** Accepted --> Accepted but acceptedRole changed : Replace */
    if (checkIfAccepted(oldFields.status) && checkIfAccepted(updatedFields.status)
      && oldFields.status[1] !== updatedFields.status[1]) {
      updateEventRoles(oldFields.eventId, oldFields.userId,
        oldFields.status[1], updatedFields.status[1], 'replace');
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteSignUp = async (id: string, idType: SignUpIdType): Promise<void> => {
  try {
    let deletedSignUp: SignUpData | null;
    switch (idType) {
      case 'signUpId':
        deletedSignUp = await SignUp.findOneAndDelete({ _id: id });
        break;
      case 'eventId':
        // @clara should this case and userId delete all that match then?
        deletedSignUp = await SignUp.findOneAndDelete({ eventId: id });
        break;
      case 'userId':
        deletedSignUp = await SignUp.findOneAndDelete({ userId: id });
        break;
      default: throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    if (deletedSignUp && checkIfAccepted(deletedSignUp.status)) {
      updateEventRoles(deletedSignUp.eventId, deletedSignUp.userId, deletedSignUp.status[1], '', 'remove');
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createSignUp,
  getSignUps,
  getPendingSignUps,
  updateSignUp,
  deleteSignUp,
};
