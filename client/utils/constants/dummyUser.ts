import { UserState } from "@redux/reducers/user";
import { CITIZENSHIP, GENDER, LEADERSHIP_INTEREST, PERSONALITY, RACE, SOCIAL_MEDIA_PLATFORMS, VolunteerData, VOLUNTEER_TYPE } from "@type/volunteer";

const dummyData : VolunteerData = {
  _id: 'sampleid',
  name: 'Benjamin Lim',
  address: '1 Tekong Road',
  mobileNumber: '9695 2546',
  birthday: new Date(1994, 5, 5),
  email: 'benjaminvolunteer@gmail.com',
  socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS['instagram'],
  nickname: 'Ben',
  photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  matchedVolunteer: 123, // what is this?
  gender: GENDER['male'],
  citizenship: CITIZENSHIP['singapore'],
  race: RACE['chinese'],
  orgnanization: 'NUS',
  position: 'student',
  volunteerType: VOLUNTEER_TYPE['admin'],
  referral: 'Magic Johnson',

  hasVolunteered: true,
  hasChildrenExperience: true,
  hasVolunteeredExternally: true,
  hasFirstAidCertification: true,

  leadershipInterest: LEADERSHIP_INTEREST['yes'],
  description: "Lorem Ipsum is simply dummy text.",
  interests: ['basketball', 'cooking', 'running'],
  personality: PERSONALITY['ENFP_A'],
  skills: ['programming', 'cooking'],
  volunteerReason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  volunteerContribution: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  volunteerFrequency: 2, // what frequency are we referring to? 2 times a week?

  // Remarks
  volunteerRemarks: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  adminRemarks: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

  // Event count
  volunteeringSessionsCount: 23,
  workshopsCount: 32,
  hangoutsCount: 3,

  createdAt: new Date(2015, 5, 5)
}

const dummyUser : UserState = {
  token: 'whatevertoken',
  user: dummyData
}

export default dummyUser