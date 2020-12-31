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

export enum VOLUNTEER_TYPE {
    'ad-hoc', 'committed', 'lead', 'admin'
}

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
    volunteerType: VOLUNTEER_TYPE,
    referral: string,

    hasVolunteered: boolean,
    hasChildrenExperience: boolean,
    hasVolunteeredExternally: boolean,
    hasFirstAidCertification: boolean,

    leadershipInterest: LEADERSHIP_INTEREST,
    description: string,
    interests: string[],
    personality: PERSONALITY,
    skills: string[],
    volunteerReason: string,
    volunteerContribution: string,
    volunteerFrequency: number,

    // Remarks
    volunteerRemarks: string,
    adminRemarks: string,

    // Event count
    volunteeringSessionsCount: number,
    workshopsCount: number,
    hangoutsCount: number

    createdAt: Date, // used for member since // is snake case not camel case
    // is there a way to parse strings into dates automatically when the strings are just fetched via api?
}
