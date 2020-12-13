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
  _id: string,
  name: string,
  password: string,
  identificationNumber: string,
  address: string,
  mobileNumber: string,
  birthday: Date,
  email: string,
  socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS,
  nickname?: string,
  photoUrl: string,
  matchedVolunteer: Number,
  gender: GENDER_TYPES,
  citizenship: CITIZENSHIP_TYPES,
  race: RACE_TYPES,
  orgnanization: string,
  position: string,
  status: VOLUNTEER_STATUS,
  role: VOLUNTEER_ROLE,
  referral: string,

  hasVolunteered: Boolean,
  hasChildrenExperience: Boolean,
  hasVolunteeredExternally: Boolean,
  hasFirstAidCertification: Boolean,

  leadershipInterest: LEADERSHIP_INTEREST_TYPES,
  description: string,
  interests: Array<string>,
  personality: PERSONALITY_TYPES,
  skills: Array<string>,
  volunteerReason: string,
  volunteerContribution: string,
  volunteerFrequency: Number,

  // Remarks
  volunteerRemarks: string,
  administratorRemarks: string,
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
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(volunteer.pending, (state) => {
      state.volunteers = [];
    });
    builder.addCase(volunteer.fulfilled, (state, action) => {
      const { payload } = action;
      state.volunteers = payload;
    });
    builder.addCase(volunteer.rejected, (state) => {
      state.volunteers = [];
    });
  },
});

export default volunteerSlice.reducer;
