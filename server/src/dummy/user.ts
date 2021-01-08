import { VolunteerData } from '../types';

const dummyUser: VolunteerData = {
  _id: 'dummyid',
  name: 'Lead',
  password: 'stringstringstring',
  photoUrl: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg',
  address: 'string',
  mobileNumber: '82919191',
  birthday: new Date('October 13, 2000 11:13:00'),
  email: 'dummy@gmail.com',
  socialMediaPlatform: 'instagram',
  gender: 'female',
  citizenship: 'singapore',
  race: 'chinese',
  leadershipInterest: 'yes',
  volunteerType: 'ad-hoc',
  interests: 'No interests',
  languages: ['english', 'malay'],
  hasAllergies: false,
  hasMedicalNeeds: false,
  hasMedicationDuringDay: false,
  emergencyContactEmail: 'dasco@gmail.com',
  emergencyContactName: 'dasco',
  emergencyContactRelationship: 'brother',
  emergencyContactNumber: '87417215',
  referralSources: ['Other'],
  sessionsPerMonth: 1,
  hasVolunteeredExternally: true,
  personality: 'ISFJ_A',
  skills: ['string'],
  volunteerReason: 'string',
  volunteerRemarks: 'string',
  adminRemarks: 'string',
  hasVolunteered: true,
  hasChildrenExperience: true,
  hasFirstAidCertification: true,
  volunteerContribution: 'string',
  volunteeringSessionsCount: 1,
  workshopsCount: 1,
  hangoutsCount: 1,
};

export default () => (dummyUser);
