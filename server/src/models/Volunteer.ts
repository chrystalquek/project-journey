import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { VolunteerData } from '../types';

const { Schema } = mongoose;

export const setPassword = (value: string) => bcrypt.hashSync(value, 10);

export type VolunteerModel = VolunteerData & mongoose.Document;

// ENUM Types
export const GENDER_TYPES = ['male', 'female'];
export const CITIZENSHIP_TYPES = ['singapore', 'permanent_resident', 'foreigner'];
export const RACE_TYPES = ['chinese', 'malay', 'indian', 'caucasian', 'other'];
export const LEADERSHIP_INTEREST_TYPES = ['yes', 'no', 'maybe'];
export const PERSONALITY_TYPES = [
  'INTJ_A',
  'INTJ_T',
  'INTP_A',
  'INTP_T',
  'ENTJ_A',
  'ENTJ_T',
  'ENFP_A',
  'ENFP_T',
  'ISTJ_A',
  'ISTJ_T',
  'ISFJ_A',
  'ISFJ_T',
  'ESTJ_A',
  'ESTJ_T',
  'ESFJ_A',
  'ESFJ_T',
  'ISTP_A',
  'ISTP_T',
  'ISFP_A',
  'ISFP_T',
  'ESTP_A',
  'ESTP_T',
  'ESFP_A',
];

export const VolunteerSchemaDefinition = {
  _id: mongoose.Types.ObjectId,
  full_name: String,
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
  identification_number: String, // TODO: Confirm do we need to store this? (sensitive data)
  address: String,
  mobile_number: String,
  birthday: Date,
  email: String,
  social_media_platform: {
    type: String,
    enum: ['instagram', 'facebook', 'snapchat', 'email', 'other'],
  },
  nickname: {
    type: String,
    default: '',
  },
  photo_url: String, // Process on server side - not immediately available
  matched_volunteer: Number, // (nullable) -> support later phase
  gender: {
    type: String,
    enum: GENDER_TYPES,
  },
  citizenship: {
    type: String,
    enum: CITIZENSHIP_TYPES,
  },
  race: {
    type: String,
    enum: RACE_TYPES,
  },
  orgnanization: String,
  position: String,
  status: {
    type: String,
    enum: ['pending', 'verified'],
  },
  role: {
    type: String,
    enum: ['editor', 'admin'],
  },
  referral: String, // TODO: Confirm the existence of this field

  has_volunteered: Boolean,
  has_children_experience: Boolean,
  has_volunteered_other_places: Boolean,
  has_first_aid_certification: Boolean,

  leadership_interest: {
    type: String,
    enum: LEADERSHIP_INTEREST_TYPES,
  },
  description: {
    type: String,
  },
  interests: {
    type: [String],
  },
  personality: {
    type: String,
    enum: PERSONALITY_TYPES,
  },
  skills: {
    type: [String],
  },
  volunteer_reason: String,
  volunteer_contribution: String,
  volunteer_frequency: Number,

  // Remarks
  volunteer_remark: String,
  adminstrator_remark: String,
};

const VolunteerSchema = new Schema(VolunteerSchemaDefinition, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  strict: true,
});

export default mongoose.model<VolunteerModel>('Volunteer', VolunteerSchema);
