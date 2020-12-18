import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import SignUp, { SignUpModel } from '../models/SignUp';

import Event from '../models/Event';
import { SignUpData, SignUpIdType, RoleData } from '../types';

const INVALID_SIGN_UP_ID_TYPE = 'Invalid sign up id type';

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

const addOrRemoveVolunteerFromEvent = async (eventId: string,
  volunteerId: string, roleName: string, isVolunteerToBeAdded: boolean) => {
  try {
    const unupdatedEvent = await Event.findById(eventId);
    const eventRoles = (unupdatedEvent?.roles)?.map((role) => {
      if (role.name === roleName) {
        if (isVolunteerToBeAdded) {
          role.volunteers.push(volunteerId);
        } else {
          const index = role.volunteers.indexOf(volunteerId);
          role.volunteers.splice(index, 1);
        }
      }
      return role;
    });

    await Event.findOneAndUpdate({ _id: eventId }, { $set: { roles: eventRoles } });
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateSignUp = async (id: string, idType: SignUpIdType,
  updatedFields: SignUpData): Promise<void> => {
  try {
    let oldSignUp;
    switch (idType) {
      case 'signUpId':
        oldSignUp = await SignUp.findOneAndUpdate(
          { sign_up_id: id },
          { $set: updatedFields },
        );
        break;
      case 'eventId':
        oldSignUp = await SignUp.findOneAndUpdate(
          { event_id: id },
          { $set: updatedFields },
        );
        break;
      case 'userId':
        oldSignUp = await SignUp.findOneAndUpdate(
          { user_id: id },
          { $set: updatedFields },
        );
        break;
      default:
        throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    /** Add or remove volunteer from Event.volunteers array if SignUp.status changes */
    /** status is an array if the sign up is accepted i.e. ["accepted", string] */
    if (!Array.isArray(oldSignUp.status) && Array.isArray(updatedFields.status)) {
      addOrRemoveVolunteerFromEvent(oldSignUp.event_id, oldSignUp.user_id,
        updatedFields.status[1], true);
    }

    if (Array.isArray(oldSignUp.status) && !Array.isArray(updatedFields.status)) {
      addOrRemoveVolunteerFromEvent(oldSignUp.event_id, oldSignUp.user_id,
        oldSignUp.status[1], false);
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
