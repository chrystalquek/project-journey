import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import SignUp, { SignUpModel } from '../models/SignUp';

import Event from '../models/Event';
import { SignUpData, SignUpIdType, SignUpStatus } from '../types';

const INVALID_SIGN_UP_ID_TYPE = 'Invalid sign up id type';
type UpdateEventVolunteersAction = 'add' | 'remove' | 'replace'

const createSignUp = async (signUpData: Omit<SignUpData, 'signUpId'>): Promise<void> => {
  try {
    const signUpSchemaData = new SignUp({
      sign_up_id: uuidv4(),
      event_id: signUpData.eventId,
      user_id: signUpData.userId,
      status: signUpData.status,
      preferences: signUpData.preferences,
      is_restricted: signUpData.isRestricted,
    });
    await signUpSchemaData.save();
  } catch (err) {
    throw new Error(err.msg);
  }
};

const readSignUps = async (id: string, idType: SignUpIdType) => {
  try {
    let signUp;
    switch (idType) {
      case 'signUpId':
        signUp = await SignUp.find({ sign_up_id: id });
        break;
      case 'eventId':
        signUp = await SignUp.find({ event_id: id });
        break;
      case 'userId':
        signUp = await SignUp.find({ user_id: id });
        break;
      default: throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    return signUp;
  } catch (err) {
    throw new Error(err.msg);
  }
};

/**
 * Checks if the SignUpStatus is of type ['accepted', acceptedRole]
 * @param status either 'pending', 'rejected', or ['accepted', acceptedRole]
 */
export const checkIfAccepted = (status: SignUpStatus): boolean => Array.isArray(status) && status[0] === 'accepted';

/**
 * Adds a volunteer id to event.roles.volunteers
 * @param roles event.roles
 * @param newRole name of the new role
 * @param volunteerId user id of the volunteer to be added
 */
const addEventVolunteers = (roles, newRole, volunteerId) => {
  const updatedRoles = roles.map((role) => {
    if (role.name === newRole) {
      role.volunteers.push(volunteerId);
    }
    return role;
  });
  return updatedRoles;
};

/**
 * Removes a volunteer id from event.roles.volunteers
 * @param roles event.roles
 * @param oldRole name of the previous role
 * @param volunteerId user id of the volunteer to be removed
 */
const removeEventVolunteers = (roles, oldRole, volunteerId) => {
  const updatedRoles = roles.map((role) => {
    if (role.name === oldRole) {
      const index = role.volunteers.indexOf(volunteerId);
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
 * @param oldRole previous accepted role, if any
 * @param newRole new accepted role, if any
 * @param actionType either 'add', 'remove', or 'replace'
 */
const updateEventRoles = async (eventId: string, volunteerId: string,
  oldRole: string | null, newRole: string | null, actionType: UpdateEventVolunteersAction) => {
  try {
    const unupdatedEvent = await Event.findById(eventId);
    let eventRoles;

    if (unupdatedEvent != null) {
      switch (actionType) {
        case 'add':
          eventRoles = addEventVolunteers(unupdatedEvent.roles, newRole, volunteerId);
          break;
        case 'remove':
          eventRoles = removeEventVolunteers(unupdatedEvent.roles, oldRole, volunteerId);
          break;
        case 'replace':
          eventRoles = addEventVolunteers(unupdatedEvent.roles, newRole, volunteerId);
          eventRoles = removeEventVolunteers(eventRoles, oldRole, volunteerId);
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
          { sign_up_id: id },
          { $set: updatedFields },
        );
        break;
      case 'eventId':
        oldFields = await SignUp.findOneAndUpdate(
          { event_id: id },
          { $set: updatedFields },
        );
        break;
      case 'userId':
        oldFields = await SignUp.findOneAndUpdate(
          { user_id: id },
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
      updateEventRoles(oldFields.event_id, oldFields.user_id,
        null, updatedFields.status[1], 'add');
    }

    /** Accepted --> Not Accepted : Remove */
    if (checkIfAccepted(oldFields.status) && !checkIfAccepted(updatedFields.status)) {
      updateEventRoles(oldFields.event_id, oldFields.user_id,
        oldFields.status[1], null, 'remove');
    }

    /** Accepted --> Accepted but acceptedRole changed : Replace */
    if (checkIfAccepted(oldFields.status) && checkIfAccepted(updatedFields.status)
      && oldFields.status[1] !== updatedFields.status[1]) {
      updateEventRoles(oldFields.event_id, oldFields.user_id,
        oldFields.status[1], updatedFields.status[1], 'replace');
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteSignUp = async (id: string, idType: SignUpIdType): Promise<void> => {
  try {
    switch (idType) {
      case 'signUpId':
        await SignUp.findOneAndDelete({ sign_up_id: id });
        break;
      case 'eventId':
        await SignUp.findOneAndDelete({ event_id: id });
        break;
      case 'userId':
        await SignUp.findOneAndDelete({ user_id: id });
        break;
      default: throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createSignUp,
  readSignUps,
  updateSignUp,
  deleteSignUp,
};
