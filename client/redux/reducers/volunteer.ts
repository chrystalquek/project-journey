import { createSlice } from '@reduxjs/toolkit';
import volunteer from '../actions/volunteer';

export enum GENDER {
  'male', 'female'
}

export enum CITIZENSHIP {
  'singapore', 'permanent_resident', 'foreigner'
}

export enum RACE {
  'chinese', 'malay', 'indian', 'caucasian', 'other'
}

export enum LEADERSHIP_INTEREST {
  'yes', 'no', 'maybe'
}

export enum PERSONALITY {
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

export enum VOLUNTEER_TYPE {
  'Ad-hoc', 'Commited', 'Lead', 'Admin'
}

export type VolunteerData = {
  _id: string,
  name: string,
  password: string, // rm?
  identificationNumber: string, // rm?
  address: string,
  mobileNumber: string,
  birthday: Date,
  email: string,
  socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS,
  nickname: string,
  photoUrl: string,
  matchedVolunteer: number,
  gender: GENDER,
  citizenship: CITIZENSHIP,
  race: RACE,
  orgnanization: string,
  position: string,
  status: VOLUNTEER_STATUS,
  role: VOLUNTEER_ROLE,
  referral: string,

  hasVolunteered: boolean,
  hasChildrenExperience: boolean,
  hasVolunteeredExternally: boolean,
  hasFirstAidCertification: boolean,

  leadershipInterest: LEADERSHIP_INTEREST,
  description: string,
  interests: [string],
  personality: PERSONALITY,
  skills: [string],
  volunteerReason: string,
  volunteerContribution: string,
  volunteerFrequency: number,
  volunteerType: VOLUNTEER_TYPE,

  // Remarks
  volunteerRemarks: string,
  administratorRemarks: string,

  created_at: Date, // used for member since // is snake case not camel case
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
