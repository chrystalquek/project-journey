export type GENDER = 'male' | 'female'


export type CITIZENSHIP = 'singapore' | 'permanent_resident' | 'foreigner';

export type RACE = 'chinese' | 'malay' | 'indian' | 'caucasian' | 'other'


export type LEADERSHIP_INTEREST =
    'yes' | 'no' | 'maybe'


export type PERSONALITY =
    'INTJ_A' |
    'INTJ_T' |
    'INTP_A' |
    'INTP_T' |
    'ENTJ_A' |
    'ENTJ_T' |
    'ENFP_A' |
    'ENFP_T' |
    'ISTJ_A' |
    'ISTJ_T' |
    'ISFJ_A' |
    'ISFJ_T' |
    'ESTJ_A' |
    'ESTJ_T' |
    'ESFJ_A' |
    'ESFJ_T' |
    'ISTP_A' |
    'ISTP_T' |
    'ISFP_A' |
    'ISFP_T' |
    'ESTP_A' |
    'ESTP_T' |
    'ESFP_A';


export type SOCIAL_MEDIA_PLATFORMS =
    'instagram' | 'facebook' | 'snapchat' | 'email' | 'other'


export type VOLUNTEER_STATUS =
    'pending' | 'verified'


export type VOLUNTEER_ROLE =
    'editor' | 'admin' | 'lead'


export type VOLUNTEER_TYPE =
    'ad-hoc' | 'committed' | 'lead' | 'admin'

export const VOLUNTEER_TYPE_OPTIONS: Array<VOLUNTEER_TYPE> =
    ['ad-hoc', 'committed', 'lead', 'admin']


export type VolunteerData = {
    _id: string,
    name: string,
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

    createdAt: Date, // used for member since // is snake case not camel case
    // is there a way to parse strings into dates automatically when the strings are just fetched via api?
}
