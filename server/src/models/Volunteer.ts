import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { VolunteerData } from '../types';

const { Schema } = mongoose;

// encrypt password
export const setPassword = (value: string) => bcrypt.hashSync(value, 10);

export type VolunteerModel = VolunteerData & mongoose.Document;

export const VolunteerSchemaDefinition = {
  _id: mongoose.Types.ObjectId,
  full_name: String,
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
  identification_number: String,
  home_address: String,
  mobile_number: String,
  birthday: Date,
  email: String,
  social_media_platform: {
    type: String,
    enum: ['instagram', 'facebook', 'snapchat', 'email', 'other'],
  },
  year_joined: Number,
  nickname: String, // optional?
  photo_url: String,
  matched_volunteer: Number, // (nullable)
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  citizenship: {
    type: String,
    enum: ['singapore', 'permanent_resident', 'foreigner'],
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
  referral: String, // referral for?

  has_volunteered: Boolean,
  has_children_experience: Boolean,
  has_volunteered_other_places: Boolean,
  has_first_aid_certification: Boolean,

  leadership_interest: {
    type: String,
    enum: ['yes', 'no', 'maybe', 'other'],
  },
  description: {
    type: String,
  },
  interests: {
    type: [String],
  },
  personality: {
    type: String,
    enum: [
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
    ],
  },
  volunteer_reason: String,
  contribution: String,
  volunteer_length: Number,
  sessions_per_month: Number,

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
