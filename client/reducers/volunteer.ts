import { createSlice } from '@reduxjs/toolkit';
import volunteer from '../actions/volunteer';

export enum GENDER_TYPES {
  'male', 'female'
}

export enum CITIZENSHIP_TYPES {
  'singapore', 'permanent_resident', 'foreigner'
}

export enum RACE_TYPES {
  'chinese', 'malay', 'indian', 'caucasian', 'other'
}

export enum LEADERSHIP_INTEREST_TYPES {
  'yes', 'no', 'maybe'
}

export enum PERSONALITY_TYPES {
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
}

export enum SOCIAL_MEDIA_PLATFORMS {
  'instagram', 'facebook', 'snapchat', 'email', 'other'
}

export enum VOLUNTEER_STATUS {
  'pending', 'verified'
}

export enum VOLUNTEER_ROLE {
  'editor', 'admin', 'lead'
}

export type VolunteerData = {
  _id: String,
  name: string,
  password: String,
  identificationNumber: String,
  address: String,
  mobileNumber: String,
  birthday: Date,
  email: String,
  socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS,
  nickname?: String,
  photoUrl: String,
  matchedVolunteer: Number,
  gender: GENDER_TYPES,
  citizenship: CITIZENSHIP_TYPES,
  race: RACE_TYPES,
  orgnanization: String,
  position: String,
  status: VOLUNTEER_STATUS,
  role: VOLUNTEER_ROLE,
  referral: String,

  hasVolunteered: Boolean,
  hasChildrenExperience: Boolean,
  hasVolunteeredExternally: Boolean,
  hasFirstAidCertification: Boolean,

  leadershipInterest: LEADERSHIP_INTEREST_TYPES,
  description: String,
  interests: Array<String>,
  personality: PERSONALITY_TYPES,
  skills: Array<String>,
  volunteerReason: String,
  volunteerContribution: String,
  volunteerFrequency: Number,

  // Remarks
  volunteerRemarks: String,
  administratorRemarks: String,
}

export type VolunteerState = {
  volunteers: Array<VolunteerData>;
}

const initialState: VolunteerState = {
  volunteers: [],
};

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(volunteer.pending, (state) => {
      return {
        ...state,
        volunteers: []
      };
    })
      .addCase(volunteer.fulfilled, (state, action) => {
        const { payload } = action;
        return {
          ...state,
          volunteers: payload
        }
      })
      .addCase(volunteer.rejected, (state) => {
        return {
          ...state,
          volunteers: []
        }
      })
      .addDefaultCase((state) => {
        return state;
      })
  },
});

export default volunteerSlice.reducer;
