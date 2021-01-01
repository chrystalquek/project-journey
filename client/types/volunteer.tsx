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

export enum Volunteer {
  Adhoc = 'ad-hoc',
  Committed = 'committed',
  Lead = 'lead',
  Admin = 'admin'
}
export type VOLUNTEER_TYPE = Volunteer.Adhoc | Volunteer.Committed | Volunteer.Admin;

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

    created_at: Date, // used for member since // is snake case not camel case
    // is there a way to parse strings into dates automatically when the strings are just fetched via api?
}
