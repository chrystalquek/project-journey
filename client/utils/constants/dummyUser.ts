import { UserState } from '@redux/reducers/user';
import {
  CITIZENSHIP,
  GENDER,
  LEADERSHIP_INTEREST,
  PERSONALITY, RACE,
  SOCIAL_MEDIA_PLATFORMS,
  VolunteerData, VOLUNTEER_TYPE,
} from '@type/volunteer';

const dummyData : VolunteerData = {
  _id: 'secretsampleid',
  name: 'Benjamin Lim',
  address: '1 Tekong Road',
  mobileNumber: '9695 2546',
  birthday: new Date(1994, 5, 5),
  email: 'benjaminvolunteer@gmail.com',
  socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS.INSTAGRAM,
  nickname: 'Ben',
  photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  gender: GENDER.MALE,
  citizenship: CITIZENSHIP.SINGAPORE,
  race: RACE.CHINESE,
  organization: 'NUS',
  position: 'student',
  volunteerType: VOLUNTEER_TYPE.ADHOC,
  referralSources: ['Magic Johnson'],

  languages: ['mandarin', 'english'],

  hasVolunteered: true,
  hasChildrenExperience: true,
  hasVolunteeredExternally: true,
  hasFirstAidCertification: true,
  hasMedicationDuringDay: true,

  leadershipInterest: LEADERSHIP_INTEREST.YES,
  interests: 'basketball, cooking, running',
  personality: PERSONALITY.ENFP_A,
  skills: ['programming', 'cooking'],
  volunteerReason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  volunteerContribution: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

  // Remarks
  volunteerRemarks: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  administratorRemarks: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

  // Event count
  volunteeringSessionsCount: 23,
  workshopsCount: 32,
  hangoutsCount: 3,

  // Record of past events
  pastEventIds: ['somepasteventid'],

  // Record of commitment applications
  commitmentApplicationIds: ['somecommitmentapplicationid'],

  hasMedicalNeeds: true,
  hasAllergies: true,

  emergencyContactEmail: 'help@help.com',
  emergencyContactNumber: '12345678',
  emergencyContactName: 'Help is needed',
  emergencyContactRelationship: 'special friend',

  createdAt: new Date(2015, 5, 5),
};

const dummyUser : UserState = {
  token: 'whatevertoken',
  status: '',
  user: dummyData,
};

export default dummyUser;
