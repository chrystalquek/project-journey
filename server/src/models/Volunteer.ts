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
export const CITIZENSHIP_TYPES = [
  'singapore',
  'permanent_resident',
  'foreigner',
];
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
export const SOCIAL_MEDIA_PLATFORMS = [
  'instagram',
  'facebook',
  'snapchat',
  'email',
  'other',
];
export const VOLUNTEER_TYPE = ['ad-hoc', 'committed', 'admin'];

export const VolunteerSchemaDefinition: mongoose.SchemaDefinition = {
  _id: mongoose.Types.ObjectId,
  volunteerType: {
    type: String,
    enum: VOLUNTEER_TYPE,
  },
  name: String,
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
  nickname: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    enum: GENDER_TYPES,
  },
  citizenship: {
    type: String,
    enum: CITIZENSHIP_TYPES,
  },
  birthday: Date,
  address: String,
  mobileNumber: String,
  photoUrl: String, // Process on server side - not immediately available
  email: String,

  socialMediaPlatform: {
    type: String,
    enum: SOCIAL_MEDIA_PLATFORMS,
  },
  instagramHandle: {
    type: String,
    default: '',
  },
  orgnanization: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: '',
  },
  race: {
    type: String,
    enum: RACE_TYPES,
  },
  languages: [String],
  referralSources: [String],
  hasVolunteered: Boolean,
  biabVolunteeringDuration: {
    type: Number,
    default: 0,
  },
  hasVolunteeredExternally: Boolean,
  volunteeringExperience: {
    type: String,
    default: '',
  },
  hasChildrenExperience: Boolean,
  childrenExperience: {
    type: String,
    default: '',
  },
  hasFirstAidCertification: Boolean,
  leadershipInterest: {
    type: String,
    default: '',
  },
  interests: {
    type: String,
    default: '',
  },
  skills: {
    type: [String],
    default: [],
  },
  personality: {
    type: String,
    enum: PERSONALITY_TYPES,
  },
  strengths: {
    type: String,
  },
  volunteeringOpportunityInterest: {
    type: String,
    default: '',
  },
  volunteerReason: String,
  volunteerContribution: String,

  // WCA Registration: Medical Information
  hasMedicalNeeds: Boolean,
  medicalNeeds: {
    type: String,
    default: '',
  },
  hasAllergies: Boolean,
  allergies: {
    type: String,
    default: '',
  },
  hasMedicationDuringDay: Boolean,

  // WCA Registration: Emergency Contact
  emergencyContactName: {
    type: String,
    default: '',
  },
  emergencyContactNumber: {
    type: String,
    default: '',
  },
  emergencyContactEmail: {
    type: String,
    default: '',
  },
  emergencyContactRelationship: {
    type: String,
    default: '',
  },
  // Remarks
  volunteerRemarks: {
    type: String,
    default: '',
  },
  administratorRemarks: {
    type: String,
    default: '',
  },
  volunteeringSessionsCount: {
    type: Number,
    default: 0,
  },
  workshopsCount: {
    type: Number,
    default: 0,
  },
  hangoutsCount: {
    type: Number,
    default: 0,
  },
  pastEventIds: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
      },
    ],
    default: [],
  },
  commitmentApplicationIds: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'CommitmentApplication',
      },
    ],
    default: [],
  },
};

const VolunteerSchema = new Schema(VolunteerSchemaDefinition, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  strict: true,
});

VolunteerSchema.index({ name: 'text' }); // to enable searching by name

export default mongoose.model<VolunteerModel>('Volunteer', VolunteerSchema);
