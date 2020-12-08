import mongoose from 'mongoose';
import { SignUpData, SignUpIdType } from '../types';
import SignUp from '../models/SignUp';

const INVALID_SIGN_UP_ID_TYPE = 'Invalid sign up id type';
const createSignUp = async (signUpData: SignUpData): Promise<void> => {
  try {
    const signUpSchemaData = new SignUp({
      _id: new mongoose.Types.ObjectId(),
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

const readSignUp = async (id: string, idType: SignUpIdType): Promise<SignUpData> => {
  try {
    let signUp;
    switch (idType) {
      case 'signUpId':
        signUp = await SignUp.findById(id);
        break;
      case 'eventId':
        signUp = await SignUp.find({ event_id: id });
        break;
      case 'userId':
        signUp = await SignUp.find({ user_id: id });
        break;
      default: throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    if (!signUp) {
      throw new Error('Sign up is not found');
    }

    return signUp;
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateSignUp = async (id: string, idType: SignUpIdType, updatedFields: SignUpData): Promise<void> => {
  try {
    switch (idType) {
      case 'signUpId':
        await SignUp.findOneAndUpdate(
          { _id: id },
          { $set: updatedFields },
          { new: true },
        );
        break;
      case 'eventId':
        await SignUp.findOneAndUpdate(
          { event_id: id },
          { $set: updatedFields },
          { new: true },
        );
        break;
      case 'userId':
        await SignUp.findOneAndUpdate(
          { user_id: id },
          { $set: updatedFields },
          { new: true },
        );
        break;
      default:
        throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteSignUp = async (id: string, idType: SignUpIdType): Promise<void> => {
  try {
    let signUp;

    switch (idType) {
      case 'signUpId':
        signUp = await SignUp.findById(id);
        break;
      case 'eventId':
        signUp = await SignUp.find({ event_id: id });
        break;
      case 'userId':
        signUp = await SignUp.find({ user_id: id });
        break;
      default: throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }
    if (!signUp) {
      throw new Error("Sign up can't be found");
    }

    await signUp.remove();
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createSignUp,
  readSignUp,
  updateSignUp,
  deleteSignUp,
};
