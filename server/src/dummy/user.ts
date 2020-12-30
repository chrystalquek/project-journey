import { VolunteerData } from '../types';

const dummyUser: VolunteerData = {
  _id: 'dummyid',
  name: 'Lead',
  password: 'stringstringstring',
  address: 'string',
  mobileNumber: '82919191',
  birthday: new Date('October 13, 2014 11:13:00'),
  email: 'alexandermatthew12@gmail.com',
  socialMediaPlatform: 'instagram',
  gender: 'female',
  citizenship: 'singapore',
  race: 'chinese',
  status: 'verified',
  role: 'lead',
  volunteerType: 'lead',
  leadershipInterest: 'yes',
  description: 'string',
  interests: ['string'],
  personality: 'ISFJ_A',
  skills: ['string'],
  volunteerReason: 'string',
  volunteerFrequency: 1,
  volunteerRemarks: 'string',
  administratorRemarks: 'string',
  hasVolunteered: true,
  hasChildrenExperience: true,
  hasExternalVolunteerExperience: true,
  hasFirstAidCertification: true,
  volunteerContribution: 'string',
};

export default () => (dummyUser);
