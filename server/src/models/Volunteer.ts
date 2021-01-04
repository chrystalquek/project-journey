import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { VolunteerData } from '../types';

const { Schema } = mongoose;

export const setPassword = (value: string) => bcrypt.hashSync(value, 10);

export type VolunteerModel = VolunteerData & mongoose.Document;

// ENUM Types
// should we declare as enums instead?
// enum strings can be all caps, snakecase?
// same for client
// TODO: UPDATE ENUMS TO FOLLOW THE FE
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
export const SOCIAL_MEDIA_PLATFORMS = ['instagram', 'facebook', 'snapchat', 'email', 'other'];
export const VOLUNTEER_TYPE = ['ad-hoc', 'committed', 'lead', 'admin'];

export const VolunteerSchemaDefinition = {
  _id: mongoose.Types.ObjectId,
  name: String,
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
  identificationNumber: String, // TODO: Confirm do we need to store this? (sensitive data)
  address: String,
  mobileNumber: String,
  birthday: Date,
  email: String,
  socialMediaPlatform: {
    type: String,
    enum: SOCIAL_MEDIA_PLATFORMS,
  },
  nickname: {
    type: String,
    default: '',
  },
  photoUrl: String, // Process on server side - not immediately available
  matchedVolunteer: Number, // (nullable) -> support later phase
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
    enum: ['editor', 'admin', 'lead'],
  },
  referral: String, // TODO: Confirm the existence of this field

  hasVolunteered: Boolean,
  hasChildrenExperience: Boolean,
  hasVolunteeredExternally: Boolean,
  hasFirstAidCertification: Boolean,

  leadershipInterest: {
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
  volunteerReason: String,
  volunteerContribution: String,
  volunteerFrequency: Number,
  volunteerType: {
    type: String,
    enum: VOLUNTEER_TYPE,
  },

  // Remarks
  volunteerRemarks: String,
  administratorRemarks: String,
};

const VolunteerSchema = new Schema(VolunteerSchemaDefinition, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  strict: true,
});

VolunteerSchema.index({ name: 'text' }); // to enable searching by name

export default mongoose.model<VolunteerModel>('Volunteer', VolunteerSchema);
